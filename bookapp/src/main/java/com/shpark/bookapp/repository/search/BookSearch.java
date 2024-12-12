package com.shpark.bookapp.repository.search;

import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;

public interface BookSearch {

    PageResponseDTO<BookDTO> searchList (PageRequestDTO pageRequestDTO);
}
