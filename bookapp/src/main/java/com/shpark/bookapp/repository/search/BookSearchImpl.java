package com.shpark.bookapp.repository.search;

import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import com.shpark.bookapp.domain.Book;
import com.shpark.bookapp.domain.QBook;
import com.shpark.bookapp.domain.QBookImage;
import com.shpark.bookapp.dto.BookDTO;
import com.shpark.bookapp.dto.PageRequestDTO;
import com.shpark.bookapp.dto.PageResponseDTO;
import lombok.extern.log4j.Log4j2;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.Objects;

@Log4j2
public class BookSearchImpl extends QuerydslRepositorySupport implements BookSearch {

    public BookSearchImpl() {
        super(Book.class);
    }


    @Override
    public PageResponseDTO<BookDTO> searchList(PageRequestDTO pageRequestDTO) {

        log.info("-----------searchList------------");

        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage()-1,
                pageRequestDTO.getSize(),
                Sort.by("bno").descending());

        QBook book = QBook.book;
        QBookImage bookImage = QBookImage.bookImage;

        JPQLQuery<Book> query = from(book);

        query.leftJoin(book.imageList, bookImage);

        query.where(bookImage.ord.eq(0));

        Objects.requireNonNull(getQuerydsl()).applyPagination(pageable, query);

        List<Tuple> bookList = query.select(book,bookImage).fetch();

        long count = query.fetchCount();

        log.info("----------------------------");
        log.info(bookList);

        return null;
    }
}
