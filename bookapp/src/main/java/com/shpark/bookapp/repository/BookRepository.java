package com.shpark.bookapp.repository;

import com.shpark.bookapp.domain.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jdbc.repository.query.Modifying;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    @EntityGraph(attributePaths = "imageList")
    @Query("select b from Book b where b.bno = :bno")
    Optional<Book> findByBno(@Param("bno") Integer bno);

    @Modifying
    @Query("update Book b set b.delFlag = :delFlag where b.bno = :bno")
    void deleteByBnoAndDelFlag(@Param("bno") Integer bno, @Param("delFlag") boolean delFlag);

    @Query("select b from Book b left join b.imageList bi where bi.ord = 0 and b.delFlag = false ")
    Page<Object[]> findBy(Pageable pageable);
}
