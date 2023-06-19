package synergy_overflow.member.controller;

import com.google.gson.Gson;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import synergy_overflow.SynergyOverflowApplication;
import synergy_overflow.member.dto.MemberDto;


import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(classes = SynergyOverflowApplication.class)
@AutoConfigureMockMvc
class MemberControllerTest {

    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private Gson gson;



    @Test
    void createAccountForm() throws Exception{
        //given
        MemberDto.Post post = new MemberDto.Post("hgd@gmail.com",
                "q1w2e3r4!",
                "홍길동");
        String content =gson.toJson(post);



        //when
        ResultActions actions  =
                mockMvc.perform(post("/members")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content));
    }



    @Test
    void findMember() throws Exception{
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

        //get
        //when,then
        mockMvc.perform(
                        get("/members/1")
                                .accept(MediaType.APPLICATION_JSON)
                )
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.email").value(post.getEmail()))
                .andExpect(jsonPath("$.nickname").value(post.getNickname()));

    }

    @Test
    void patchMember() throws Exception{
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

        MemberDto.Patch patch = new MemberDto.Patch(1L,"q1w2e3r4!",
                "길동홍");
        String patchContent = gson.toJson(patch);

        mockMvc.perform(
                        patch("/members/1")
                                .accept(MediaType.APPLICATION_JSON)
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(patchContent)
                )
                .andExpect(status().isOk())
//                .andExpect(jsonPath("$.password").value(patch.getPassword()))
                .andExpect(jsonPath("$.nickname").value(patch.getNickname()));



    }

    //회원 삭제

    @Test
    void deleteMember() throws Exception{
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