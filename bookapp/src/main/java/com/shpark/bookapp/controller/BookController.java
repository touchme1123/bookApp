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
import java.util.stream.Collectors;

@RestController
@Log4j2
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final CustomFileUitl fileUitl;
    private final BookService bookService;

    @PostMapping("/")
    public int register(BookDTO bookDTO) {
        log.info("-----register-----");

        List<MultipartFile> files = bookDTO.getFiles();
        List<String> uploadFileNames = fileUitl.saveFiles(files);

        bookDTO.setUploadFileNames(uploadFileNames);

        int bno = bookService.register(bookDTO);

        return bno;
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

    @PutMapping("/{bno}")
    public Map<String, String> modify(@PathVariable("bno") int bno, BookDTO bookDTO) {
        log.info("-----modify-----");
        bookDTO.setBno(bno);

        BookDTO oldBookDTO = bookService.get(bno);

        List<MultipartFile> files = bookDTO.getFiles();
        List<String> currentUploadFileNames = fileUitl.saveFiles(files);

        List<String> uploadedFileNames = bookDTO.getUploadFileNames();

        if(currentUploadFileNames != null && !currentUploadFileNames.isEmpty()) {
            uploadedFileNames.addAll(currentUploadFileNames);
        }

        bookService.modify(bookDTO);

        List<String> oldFileNames = oldBookDTO.getUploadFileNames();
        if(oldFileNames != null && !oldFileNames.isEmpty()) {

            List<String> removeFiles = oldFileNames.stream().filter(fileName ->
                    uploadedFileNames.indexOf(fileName) == -1).collect(Collectors.toList());

            fileUitl.deleteFiles(removeFiles);
        }

        return Map.of("RESULT","SUCCESS");
    }

    @DeleteMapping("/{bno}")
    public Map<String, String> remove(@PathVariable("bno") int bno) {
        log.info("-----remove-----");
        List<String> oldFileNames = bookService.get(bno).getUploadFileNames();
        bookService.remove(bno);

        fileUitl.deleteFiles(oldFileNames);
        return Map.of("RESULT","SUCCESS");
    }
}
