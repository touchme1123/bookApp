package com.shpark.bookapp.controller;

import com.shpark.bookapp.dto.BookDTO;
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

    @PostMapping("/")
    public Map<String,String> register(BookDTO bookDTO) {
        log.info("-----register-----");

        List<MultipartFile> files = bookDTO.getFiles();
        List<String> uploadedFileNames = fileUitl.saveFiles(files);

        bookDTO.setUploadedFileNames(uploadedFileNames);

        return Map.of("RESULT", "SUCCESS");
    }

    @GetMapping("/view/{fileName}")
    public ResponseEntity<Resource> viewFileGet(@PathVariable("fileName") String fileName) {
        return fileUitl.getFile(fileName);
    }
}
