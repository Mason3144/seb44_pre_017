package synergy_overflow.member.controller;

import com.google.gson.Gson;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import synergy_overflow.member.dto.MemberDto;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@WithMockUser(roles = "USER")
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;


    @Test
    @Order(1)
    @DisplayName("회원 등록")
    void createAccountForm() throws Exception {
        //given
        MemberDto.Post post = new MemberDto.Post("hgd@gmail.com",
                "q1w2e3r4!",
                "홍길동");

        String content = gson.toJson(post);

        //when
        ResultActions actions =
                mockMvc.perform(post("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
    }

    @Test
    @Order(2)
    @DisplayName("회원 조회")
    void findMember() throws Exception {
        //given
        //post로 데이터 넣기
        MemberDto.Post post = new MemberDto.Post("hgd@gmail.com",
                "q1w2e3r4!",
                "홍길동");
        String postContent = gson.toJson(post);

        ResultActions postActions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postContent)
                );

//        get
//        when,then
        mockMvc.perform(
                        get("/members/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)

                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value(post.getNickname()));

    }

    @Test
    @Order(3)
    @DisplayName("회원 수정")
    void patchMember() throws Exception {
        //given
        //post로 데이터 넣기
        MemberDto.Post post = new MemberDto.Post("hgd@gmail.com",
                "q1w2e3r4!",
                "홍길동");
        String postContent = gson.toJson(post);

        ResultActions postActions =
                mockMvc.perform(
                        post("/members")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(postContent)
                );

        //patch
        //when,then

        MemberDto.Patch patch = new MemberDto.Patch(1L, "q1w2e3r4!",
                "길동홍");
        String patchContent = gson.toJson(patch);

        mockMvc.perform(
                        patch("/members/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.nickname").value(patch.getNickname()));


    }

    @Test
    @Order(4)
    @DisplayName("회원 삭제")
    void deleteMember() throws Exception {

        MemberDto.Post post = new MemberDto.Post("hgd@gmail.com",
                "q1w2e3r4!",
                "홍길동");
        String postContent = gson.toJson(post);

        mockMvc.perform(
                post("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(postContent)

        );
        mockMvc.perform(
                delete("/members/1")
        ).andExpect(status().isNoContent());
    }
}