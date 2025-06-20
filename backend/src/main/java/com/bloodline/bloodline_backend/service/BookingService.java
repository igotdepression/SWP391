package com.bloodline.bloodline_backend.service;

import com.bloodline.bloodline_backend.dto.BookingRequest;
import com.bloodline.bloodline_backend.dto.ParticipantDTO;
import com.bloodline.bloodline_backend.entity.Booking;
import com.bloodline.bloodline_backend.entity.Participant;
import com.bloodline.bloodline_backend.entity.Service;
import com.bloodline.bloodline_backend.entity.User;
import com.bloodline.bloodline_backend.repository.BookingRepository;
import com.bloodline.bloodline_backend.repository.ParticipantRepository;
import com.bloodline.bloodline_backend.repository.ServiceRepository;
import com.bloodline.bloodline_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ParticipantRepository participantRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Integer id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    public List<Booking> getBookingsByUserId(Integer userId) {
        return bookingRepository.findByUserUserID(userId);
    }

    public List<Booking> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status);
    }

    @Transactional
    public Booking createBooking(BookingRequest bookingRequest) {
        // Get current authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String userEmail = authentication.getName();

        User currentUser = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("Authenticated user not found"));

        // Find the service based on serviceType. Assuming unique serviceType for simplicity.
        // In a real app, you might want to find by serviceID if available or more robust logic.
        // For now, let's assume serviceType maps directly to a service name in the Service entity.
        Service service = serviceRepository.findByServiceName(bookingRequest.getServiceType())
                .orElseThrow(() -> new RuntimeException("Service not found for type: " + bookingRequest.getServiceType()));

        Booking booking = new Booking();
        booking.setUser(currentUser);
        booking.setService(service);
        booking.setServiceType(bookingRequest.getServiceType());
        booking.setTestType(bookingRequest.getTestType());
        booking.setAppointmentDate(bookingRequest.getAppointmentDate());
        booking.setAppointmentTime(bookingRequest.getAppointmentTime());
        booking.setNotes(bookingRequest.getNotes());
        booking.setNumSamples(bookingRequest.getNumSamples());
        booking.setStatus("Pending"); // Default status
        // totalPrice can be calculated here or later based on service and number of samples
        booking.setTotalPrice(BigDecimal.ZERO); // Placeholder for now

        Booking savedBooking = bookingRepository.save(booking);

        // Save participants
        List<Participant> participants = new ArrayList<>();
        if (bookingRequest.getParticipants() != null) {
            for (ParticipantDTO participantDTO : bookingRequest.getParticipants()) {
                Participant participant = new Participant();
                participant.setBooking(savedBooking); // Link to the created booking
                participant.setFullName(participantDTO.getFullName());
                // Handle age and dob mapping
                if (participantDTO.getDob() != null) {
                    participant.setDateOfBirth(LocalDate.of(participantDTO.getDob(), 1, 1)); // Assuming dob is just year
                }
                if (participantDTO.getAge() != null) {
                    // Age can be derived from dob, or stored directly if needed. For now, we only have dob in entity.
                    // If you need age, add it to Participant entity and DTO and store it.
                }

                participant.setGender(participantDTO.getGender());
                participant.setIdentityNumber(participantDTO.getCccd()); // Map cccd to identityNumber
                participant.setAddress(participantDTO.getAddress());
                participant.setRelationshipToCustomer(participantDTO.getRelationship());
                participant.setCollectionMethod(participantDTO.getCollectionMethod());

                participants.add(participant);
            }
            participantRepository.saveAll(participants);
            savedBooking.setParticipants(participants); // Update the saved booking with participants
        }

        return savedBooking;
    }

    public Booking updateBookingStatus(Integer bookingId, String status) {
        Booking booking = getBookingById(bookingId);
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
} 