package com.shpark.bookapp.controller;

import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.util.CustomFileUitl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final CustomFileUitl fileUitl;

    @PostMapping("/register")
    public Map<String,String> register(BookDTO bookDTO) {
        log.info("-----register-----");
        return null;
    }
}
