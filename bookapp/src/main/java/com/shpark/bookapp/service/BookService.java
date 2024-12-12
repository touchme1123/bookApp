package com.shpark.bookapp.service;

import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;
import org.springframework.transaction.annotation.Transactional;

@Transactional
public interface BookService {

    PageResponseDTO<BookDTO> getList(PageRequestDTO requestDTO);

    int register(BookDTO bookDTO);

    BookDTO get(int bno);

    void modify(BookDTO bookDTO);

    void remove(int bno);
}
