package com.dna.service;

import com.dna.dto.SampleRequestDTO;
import com.dna.dto.SampleResponseDTO;
import com.dna.entity.Booking;
import com.dna.entity.Participant;
import com.dna.entity.Sample;
import com.dna.entity.User;
import com.dna.repository.BookingRepository;
import com.dna.repository.ParticipantRepository;
import com.dna.repository.SampleRepository;
import com.dna.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SampleService {
    
    private final SampleRepository sampleRepository;
    private final BookingRepository bookingRepository;
    private final ParticipantRepository participantRepository;
    private final UserRepository userRepository;
    
    public List<SampleResponseDTO> getAllSamples() {
        return sampleRepository.findAll().stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public SampleResponseDTO getSampleById(Integer sampleID) {
        Sample sample = sampleRepository.findById(sampleID)
                .orElseThrow(() -> new RuntimeException("Sample not found with ID: " + sampleID));
        return mapToResponseDTO(sample);
    }
    
    public List<SampleResponseDTO> getSamplesByBookingId(Integer bookingID) {
        return sampleRepository.findByBookingBookingID(bookingID).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public List<SampleResponseDTO> getSamplesByType(String sampleType) {
        return sampleRepository.findBySampleType(sampleType).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }
    
    public SampleResponseDTO createSample(SampleRequestDTO requestDTO) {
        // Validate booking exists
        Booking booking = bookingRepository.findById(requestDTO.getBookingID())
                .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + requestDTO.getBookingID()));
        
        // Validate participant exists
        Participant participant = participantRepository.findById(requestDTO.getParticipantID())
                .orElseThrow(() -> new RuntimeException("Participant not found with ID: " + requestDTO.getParticipantID()));
        
        // Validate staff if provided
        User staff = null;
        if (requestDTO.getUserID() != null) {
            staff = userRepository.findById(requestDTO.getUserID())
                    .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + requestDTO.getUserID()));
        }
        
        Sample sample = Sample.builder()
                .booking(booking)
                .staff(staff)
                .participant(participant)
                .typeOfCollection(requestDTO.getTypeOfCollection())
                .sampleType(requestDTO.getSampleType())
                .receivedDate(requestDTO.getReceivedDate() != null ? 
                    requestDTO.getReceivedDate() : LocalDate.now())
                .build();
        
        Sample savedSample = sampleRepository.save(sample);
        return mapToResponseDTO(savedSample);
    }
    
    public SampleResponseDTO updateSample(Integer sampleID, SampleRequestDTO requestDTO) {
        Sample existingSample = sampleRepository.findById(sampleID)
                .orElseThrow(() -> new RuntimeException("Sample not found with ID: " + sampleID));
        
        // Update booking if changed
        if (!existingSample.getBooking().getBookingID().equals(requestDTO.getBookingID())) {
            Booking booking = bookingRepository.findById(requestDTO.getBookingID())
                    .orElseThrow(() -> new RuntimeException("Booking not found with ID: " + requestDTO.getBookingID()));
            existingSample.setBooking(booking);
        }
        
        // Update participant if changed
        if (!existingSample.getParticipant().getParticipantID().equals(requestDTO.getParticipantID())) {
            Participant participant = participantRepository.findById(requestDTO.getParticipantID())
                    .orElseThrow(() -> new RuntimeException("Participant not found with ID: " + requestDTO.getParticipantID()));
            existingSample.setParticipant(participant);
        }
        
        // Update staff if changed
        if (requestDTO.getUserID() != null) {
            User staff = userRepository.findById(requestDTO.getUserID())
                    .orElseThrow(() -> new RuntimeException("Staff not found with ID: " + requestDTO.getUserID()));
            existingSample.setStaff(staff);
        } else {
            existingSample.setStaff(null);
        }
        
        existingSample.setTypeOfCollection(requestDTO.getTypeOfCollection());
        existingSample.setSampleType(requestDTO.getSampleType());
        existingSample.setReceivedDate(requestDTO.getReceivedDate());
        
        Sample updatedSample = sampleRepository.save(existingSample);
        return mapToResponseDTO(updatedSample);
    }
    
    public void deleteSample(Integer sampleID) {
        if (!sampleRepository.existsById(sampleID)) {
            throw new RuntimeException("Sample not found with ID: " + sampleID);
        }
        sampleRepository.deleteById(sampleID);
    }
    
    private SampleResponseDTO mapToResponseDTO(Sample sample) {
        SampleResponseDTO responseDTO = new SampleResponseDTO();
        responseDTO.setSampleID(sample.getSampleID());
        responseDTO.setBookingID(sample.getBooking().getBookingID());
        responseDTO.setCustomerName(sample.getBooking().getUser().getFullName());
        responseDTO.setUserID(sample.getStaff() != null ? sample.getStaff().getUserID() : null);
        responseDTO.setStaffName(sample.getStaff() != null ? sample.getStaff().getFullName() : null);
        responseDTO.setParticipantID(sample.getParticipant().getParticipantID());
        responseDTO.setTypeOfCollection(sample.getTypeOfCollection());
        responseDTO.setSampleType(sample.getSampleType());
        responseDTO.setReceivedDate(sample.getReceivedDate());
        responseDTO.setBookingStatus(sample.getBooking().getStatus());
        return responseDTO;
    }
} 