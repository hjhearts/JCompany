package com.spring.jcompany.springboot.domain.user;

import com.spring.jcompany.springboot.domain.todo.board.Board;
import com.spring.jcompany.springboot.domain.user.dto.AdminRequestUserUpdateRequestDto;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    @Enumerated(EnumType.STRING)
    private Role role;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String password;

    @Column
    private String name;

    @Column
    private String picture;

    @Column
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime birth;

    @Column
    private String question;

    @Column
    private String answer;

    @Column
    @Enumerated(EnumType.STRING)
    private UserTeam userTeam;

    @Column
    @Enumerated(EnumType.STRING)
    private UserLevel userLevel;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Board> boardList;

    @Builder
    public User(Role role, String email, String password, String name, String picture,
                LocalDateTime birth, String question, String answer, UserTeam userTeam, UserLevel userLevel) {
        this.role = role;
        this.email = email;
        this.password = password;
        this.name = name;
        this.picture = picture;
        this.birth = birth;
        this.question = question;
        this.answer = answer;
        this.userTeam = userTeam;
        this.userLevel = userLevel;
    }

    public User update(String name, String picture, LocalDateTime birth) {
        this.name = name;
        this.picture = picture;
        this.birth = birth;
        return this;
    }

    public User updateByAdmin(UserTeam userTeam, UserLevel userLevel, Role role, String name, String picture) {
        this.userTeam = userTeam;
        this.userLevel = userLevel;
        this.role = role;
        this.name = name;
        this.picture = picture;
        return this;
    }

    public void passwordUpdate(String password) {
        this.password = password;
    }
}
