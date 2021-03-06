package com.spring.jcompany.springboot.domain.user.dto;

import com.spring.jcompany.springboot.domain.user.Role;
import com.spring.jcompany.springboot.domain.user.User;
import com.spring.jcompany.springboot.domain.user.UserLevel;
import com.spring.jcompany.springboot.domain.user.UserTeam;
import lombok.Getter;

@Getter
public class AdminRequestUserResponseDto {
    private Long id;
    private String email;
    private String name;
    private String picture;
    private UserTeam userTeam;
    private UserLevel userLevel;
    private Role role;

    public AdminRequestUserResponseDto(User entity) {
        this.id = entity.getId();
        this.email = entity.getEmail();
        this.name = entity.getName();
        String classpathUrl = entity.getPicture().replace("\\", "/");
        String baseUrl = "C:/Users/USER/Documents/GitHub/JCompany/src/main/resources/static";
        this.picture = classpathUrl.replace(baseUrl, "");
        this.userTeam = entity.getUserTeam();
        this.userLevel = entity.getUserLevel();
        this.role = entity.getRole();
    }
}
