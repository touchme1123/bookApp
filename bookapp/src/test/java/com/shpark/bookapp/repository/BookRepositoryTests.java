package com.shpark.bookapp.repository;

import com.shpark.bookapp.domain.Book;
import com.shpark.bookapp.dto.BookDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;
import java.util.UUID;

@SpringBootTest
public class BookRepositoryTests {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void testInsert() {

            Book book = Book.builder()
                    .title("test")
                    .info("test info")
                    .price(1000)
                    .quantity(100)
                    .delFlag(false)
                    .build();

            book.addImageString(UUID.randomUUID().toString() + "_test.jpg");
            bookRepository.save(book);


        Optional<Book> result = bookRepository.selectOne(2);

        BookDTO bookDTO = new BookDTO().builder()
                .title(book.getTitle())
                .build();

        bookDTO.getUploadFileNames();

        System.out.println(bookDTO);
    }

}
