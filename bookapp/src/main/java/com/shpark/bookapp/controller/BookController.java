package com.shpark.bookapp.controller;

import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;
import com.shpark.bookapp.service.BookService;
import com.shpark.bookapp.util.CustomFileUitl;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final CustomFileUitl fileUitl;
    private final BookService bookService;

    @PostMapping("/")
    public Map<String,Integer> register(BookDTO bookDTO) {
        log.info("-----register-----");

        List<MultipartFile> files = bookDTO.getFiles();
        List<String> uploadedFileNames = fileUitl.saveFiles(files);

        bookDTO.setUploadFileNames(uploadedFileNames);

        int bno = bookService.register(bookDTO);

        return Map.of("RESULT", bno);
    }

    @GetMapping("/")
    public PageResponseDTO<BookDTO> list(PageRequestDTO pageRequestDTO) {
        log.info("-----list-----");
        return bookService.getList(pageRequestDTO);
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {
        return fileUitl.getFile(fileName);
    }

    @GetMapping("/{bno}")
    public BookDTO read(@PathVariable("bno") Integer bno) {
        log.info("-----read-----");
        return bookService.get(bno);
    }




}
