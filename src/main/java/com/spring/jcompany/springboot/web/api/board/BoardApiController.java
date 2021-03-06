package com.spring.jcompany.springboot.web.api.board;

import com.spring.jcompany.springboot.domain.todo.board.dto.BoardResponseDto;
import com.spring.jcompany.springboot.domain.todo.board.dto.BoardSaveRequestDto;
import com.spring.jcompany.springboot.domain.todo.board.dto.BoardUpdateRequestDto;
import com.spring.jcompany.springboot.service.board.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
public class BoardApiController {

    private final BoardService boardService;

    @PostMapping("/api/v1/board")
    public Long boardSaveRequestControl(@RequestBody BoardSaveRequestDto requestDto) {
        return boardService.boardSaveService(requestDto);
    }

    @GetMapping("/api/v1/board/{id}")
    public BoardResponseDto boardViewRequestControl(@PathVariable("id") Long id) {
        return boardService.boardViewService(id);
    }

    @DeleteMapping("/api/v1/board/{id}")
    public void boardDeleteRequestControl(@PathVariable("id") Long id) {
        boardService.boardDeleteService(id);
    }

    @PutMapping("/api/v1/board/{id}")
    public Long boardUpdateRequestControl(@PathVariable("id") Long id, @RequestBody BoardUpdateRequestDto requestDto) {
        return boardService.boardUpdateService(id, requestDto);
    }
}
