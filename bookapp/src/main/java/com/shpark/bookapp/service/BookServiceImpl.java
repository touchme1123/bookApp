package com.shpark.bookapp.service;

import com.shpark.bookapp.domain.Book;
import com.shpark.bookapp.domain.BookImage;
import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;
import com.shpark.bookapp.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Log4j2
@RequiredArgsConstructor
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;

    @Override
    public PageResponseDTO<BookDTO> getList(PageRequestDTO pageRequestDTO) {

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage() - 1,
                pageRequestDTO.getSize(),
                Sort.by("bno").descending());

        Page<Object[]> result = bookRepository.findBy(pageable);
        // 0번째가 book 이고 1번째가 bookImage (반복)

        List<BookDTO> dtoList = result.get().map(arr -> {
            BookDTO bookDTO = null;

            Book book = (Book) arr[0];
            BookImage bookImage = (BookImage) arr[1];

            bookDTO = BookDTO.builder()
                    .bno(book.getBno())
                    .title(book.getTitle())
                    .info(book.getInfo())
                    .price(book.getPrice())
                    .author(book.getAuthor())
                    .quantity(book.getQuantity())
                    .build();

            String imageStr = bookImage.getFileName();
            bookDTO.setUploadFileNames(List.of(imageStr));

            return bookDTO;
        }).collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        return PageResponseDTO.<BookDTO>withAll()
                .dtoList(dtoList)
                .totalCount(totalCount)
                .pageRequestDTO(pageRequestDTO)
                .build();

    }

    @Override
    public int register(BookDTO bookDTO) {
        Book book = dtoToEntity(bookDTO);

        int bno = bookRepository.save(book).getBno();

        return bno;
    }

    @Override
    public BookDTO get(int bno) {

        Optional<Book> result = bookRepository.findById(bno);
        Book book = result.orElseThrow();
        return entityToDto(book);
    }

    private BookDTO entityToDto(Book book) {
        BookDTO bookDTO = BookDTO.builder()
                .bno(book.getBno())
                .title(book.getTitle())
                .info(book.getInfo())
                .price(book.getPrice())
                .author(book.getAuthor())
                .quantity(book.getQuantity())
                .delFlag(book.isDelFlag())
                .build();

        List<BookImage> imageList = book.getImageList();

        if (imageList == null || imageList.isEmpty()) {
            return bookDTO;
        }

        List<String> fileNameList = imageList.stream().map(bookImage ->
                bookImage.getFileName()).toList();

        bookDTO.setUploadFileNames(fileNameList);
        return bookDTO;
    }

    private Book dtoToEntity(BookDTO bookDTO) {
        Book book = Book.builder()
                .bno(bookDTO.getBno())
                .title(bookDTO.getTitle())
                .info(bookDTO.getInfo())
                .price(bookDTO.getPrice())
                .author(bookDTO.getAuthor())
                .quantity(bookDTO.getQuantity())
                .delFlag(bookDTO.isDelFlag())
                .build();

        List<String> uploadFileNames = bookDTO.getUploadFileNames();
        if (uploadFileNames != null && !uploadFileNames.isEmpty()) {
            return book;
        }

        uploadFileNames.forEach(fileName -> {
            book.addImageString(fileName);
        });

        return book;
    }
}
