// src/main/java/com/dna/service/BookingService.java
package com.dna.service;

import com.dna.dto.BookingRequestDTO; // Có thể cần nếu bạn có phương thức tạo booking
import com.dna.dto.BookingResponseDTO;
import com.dna.entity.Booking;
import com.dna.entity.User; // Import User nếu entity Booking có quan hệ với User
import com.dna.entity.Participant;
import com.dna.entity.Sample;
import com.dna.repository.BookingRepository;
import com.dna.repository.UserRepository; // Có thể cần nếu bạn tạo booking và cần tìm User
import com.dna.repository.ServiceRepository; // Có thể cần nếu bạn tạo booking và cần tìm Service
import com.dna.security.CustomUserDetails;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.beans.factory.annotation.Value;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.math.BigDecimal;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Slf4j
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired(required = false) 
    private UserRepository userRepository;
    @Autowired
    private ServiceRepository serviceRepository; 
    @Value("${file.upload-dir}")
    private String uploadDir;

    @Transactional
    public Booking createBooking(BookingRequestDTO bookingRequestDTO) {
        User user = userRepository.findById(bookingRequestDTO.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found with ID: " + bookingRequestDTO.getUserId()));
        com.dna.entity.ServiceEntity service = serviceRepository.findById(bookingRequestDTO.getServiceId())
                .orElseThrow(() -> new EntityNotFoundException("Service not found with ID: " + bookingRequestDTO.getServiceId()));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setService(service);
        booking.setBookingDate(LocalDate.now()); 
        booking.setAppointmentDate(bookingRequestDTO.getAppointmentDate().toLocalDate());
        booking.setStatus("PENDING"); 
        BigDecimal totalPrice = service.getPrice().multiply(BigDecimal.valueOf(bookingRequestDTO.getParticipants().size()));
        booking.setTotalPrice(totalPrice);
        booking.setUpdateDate(LocalDate.now()); 
        booking.setNumberSample(bookingRequestDTO.getNumberSample());

        // Map participants
        List<Participant> participants = bookingRequestDTO.getParticipants().stream().map(dto -> {
            Participant p = new Participant();
            p.setFullName(dto.getFullName());
            p.setDateOfBirth(dto.getDateOfBirth());
            p.setGender(dto.getGender());
            p.setRelationshipToCustomer(dto.getRelationshipToCustomer());
            p.setIdentityNumber(dto.getIdentityNumber());
            p.setAddress(dto.getAddress());
            p.setCollectionMethod(dto.getTypeOfCollection());
            // Map Sample cho participant
            Sample sample = new Sample();
            sample.setSampleType(dto.getSampleType());
            System.out.println("Type of collection: " + dto.getTypeOfCollection());
            sample.setTypeOfCollection(dto.getTypeOfCollection());
            sample.setReceivedDate(null); // hoặc LocalDate.now() nếu muốn set ngày nhận mẫu
            sample.setParticipant(p); // gán participant cho sample
            sample.setBooking(booking); // gán booking cho sample để bookingID không null
            p.setSamples(List.of(sample));
            return p;
        }).collect(Collectors.toList());
        booking.setParticipants(participants);

        return bookingRepository.save(booking);
    }

    @Transactional(readOnly = true)
    public Optional<Booking> getBookingById(Integer id) {
        return bookingRepository.findById(id);
    }

    // Phương thức lấy các booking của một người dùng cụ thể (CUSTOMER)
    @Transactional(readOnly = true)
    public List<BookingResponseDTO> getBookingsByUserId(Integer userId) {
        return bookingRepository.findByUser_UserID(userId).stream()
                .map(BookingResponseDTO::new)
                .collect(Collectors.toList());
    }

    // Khách hàng theo dõi trạng thái booking của họ.
    @Transactional(readOnly = true)
    public Optional<BookingResponseDTO> getBookingStatusForCustomer(Integer bookingId, Integer currentUserId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        // Lấy thông tin user hiện tại từ SecurityContext
        CustomUserDetails userDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userRole = userDetails.getAuthorities().stream()
                                     .findFirst()
                                     .map(a -> a.getAuthority())
                                     .orElse("");

        // Nếu là CUSTOMER, phải đảm bảo booking thuộc về user đó
        if ("ROLE_CUSTOMER".equals(userRole) && (booking.getUser() == null || !booking.getUser().getUserID().equals(currentUserId))) {
            log.warn("Access denied for customer {} trying to view booking {}. Booking not owned by customer.", currentUserId, bookingId);
            throw new AccessDeniedException("You are not authorized to view this booking.");
        }

        log.info("Booking ID {} status retrieved for user ID {}.", bookingId, currentUserId);
        return Optional.of(new BookingResponseDTO(booking));
    }



    // Lấy tất cả bookings cho Staff
    @Transactional(readOnly = true)
    public List<BookingResponseDTO> getAllBookingsForStaff() {
        log.info("Fetching all bookings for staff access.");
        List<Booking> bookings = bookingRepository.findAll();
        return bookings.stream()
                .map(BookingResponseDTO::new)
                .collect(Collectors.toList());
    }

    // Cập nhật trạng thái booking
    @Transactional
    public BookingResponseDTO updateBookingStatus(Integer bookingId, String newStatus) {
        log.info("Attempting to update status for booking ID {} to: {}", bookingId, newStatus);
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        booking.setStatus(newStatus);
        booking.setUpdateDate(LocalDate.now());

        Booking updatedBooking = bookingRepository.save(booking);
        log.info("Booking ID {} status updated to {}.", bookingId, newStatus);
        return new BookingResponseDTO(updatedBooking);
    }

    // Cập nhật ghi chú 
    @Transactional
    public BookingResponseDTO updateExpertNotes(Integer bookingId, String expertNotes) {
        log.info("Attempting to update expert notes for booking ID {}.", bookingId);
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        booking.setNote(expertNotes);
        booking.setUpdateDate(LocalDate.now());

        Booking updatedBooking = bookingRepository.save(booking);
        log.info("Booking ID {} expert notes updated.", bookingId);
        return new BookingResponseDTO(updatedBooking);
    }

    // Tải lên file kết quả
    @Transactional
    public BookingResponseDTO uploadResultFile(Integer bookingId, MultipartFile file) throws IOException {
        log.info("Attempting to upload result file for booking ID {}. Original filename: {}", bookingId, file.getOriginalFilename());
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));

        if (file.isEmpty()) {
            throw new IllegalArgumentException("Cannot upload empty file.");
        }

        try {
            Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
            Files.createDirectories(uploadPath);

            String originalFilename = file.getOriginalFilename();
            String fileExtension = "";
            if (originalFilename != null && originalFilename.contains(".")) {
                fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            }
            String fileName = UUID.randomUUID().toString() + fileExtension;
            Path filePath = uploadPath.resolve(fileName);

            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

            String fileUrl = "/uploads/" + fileName;
            booking.setUpdateDate(LocalDate.now());

            Booking updatedBooking = bookingRepository.save(booking);
            log.info("File uploaded successfully for booking ID {}. File URL: {}", bookingId, fileUrl);
            return new BookingResponseDTO(updatedBooking);
        } catch (IOException ex) {
            log.error("Could not store file for booking ID {}. Error: {}", bookingId, ex.getMessage(), ex);
            throw new IOException("Could not store file " + file.getOriginalFilename() + ". Please try again!", ex);
        }
    }

    @Transactional
    public void updateStatus(Integer bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
            .orElseThrow(() -> new EntityNotFoundException("Booking not found with ID: " + bookingId));
        booking.setStatus(newStatus);
        booking.setUpdateDate(LocalDate.now());
        bookingRepository.save(booking);
    }
}