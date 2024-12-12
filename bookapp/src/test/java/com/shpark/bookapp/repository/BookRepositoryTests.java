package com.shpark.bookapp.repository;

import com.shpark.bookapp.domain.Book;
import com.shpark.bookapp.dto.BookDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

@SpringBootTest
public class BookRepositoryTests {

    @Autowired
    private BookRepository bookRepository;

    @Test
    public void testInsert() {

        for (int i = 0; i < 15; i++) {
            Book book = Book.builder()
                    .title("test"+i)
                    .info("test info"+i)
                    .price(1000)
                    .quantity(100)
                    .delFlag(false)
                    .build();

            bookRepository.save(book);
        }
        Optional<Book> result = bookRepository.findByBno(1);
        Book book = result.orElseThrow();
        BookDTO bookDTO = new BookDTO().builder()
                .title(book.getTitle())
                .build();

        System.out.println(bookDTO);
    }
}
