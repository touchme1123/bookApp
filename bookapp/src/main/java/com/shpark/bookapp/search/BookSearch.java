package com.shpark.bookapp.search;

import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;

public interface BookSearch {
    PageResponseDTO<BookDTO> searchList (PageRequestDTO requestDTO);
}
