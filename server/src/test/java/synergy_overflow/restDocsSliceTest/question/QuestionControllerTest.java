package synergy_overflow.restDocsSliceTest.question;


import com.google.gson.Gson;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.constraints.ConstraintDescriptions;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import synergy_overflow.helper.question.QuestionRestDocsDescriptor;
import synergy_overflow.helper.question.QuestionStubData;
import synergy_overflow.question.controller.QuestionController;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.mapper.QuestionMapper;
import synergy_overflow.question.service.QuestionService;

import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.restdocs.snippet.Attributes.key;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(value = QuestionController.class)
@MockBean(JpaMetamodelMappingContext.class)
@AutoConfigureRestDocs
public class QuestionControllerTest extends QuestionStubData implements QuestionRestDocsDescriptor {
    @Autowired
    private MockMvc mockMvc;
    @MockBean
    private QuestionService service;
    @MockBean
    private QuestionMapper mapper;

    private Gson gson = new Gson();

    @Test
    public void postQuestion() throws Exception {

        given(mapper.questionDtoPostToQuestion(Mockito.any())).willReturn(new Question());

        given(service.createQuestion(Mockito.any())).willReturn(new Question());

        given(mapper.questionToQuestionDtoResponse(Mockito.any())).willReturn(generateQuestionResponse(1));


        ConstraintDescriptions postMemberConstraints = new ConstraintDescriptions(QuestionDto.Post.class);
        List<String> titleConstraint = postMemberConstraints.descriptionsForProperty("title");
        List<String> bodyConstraint = postMemberConstraints.descriptionsForProperty("body");

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.post(getQuestionUrl() + "/ask")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(questionPost(1))));

        actions
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.questionId").isNumber())
                .andExpect(jsonPath("$.title").isString())
                .andExpect(jsonPath("$.body").isString())
                .andExpect(jsonPath("$.createdAt").isString())
                .andExpect(jsonPath("$.writer").isMap())
                .andExpect(jsonPath("$.answers").isArray())
                .andDo(document("post-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestFields(
                                List.of(
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목").attributes(key("constraints").value(titleConstraint)),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("질문 내용").attributes(key("constraints").value(bodyConstraint))
                                )
                        ),
                        responseFields(
                                getSingleQuestionDescriptor()
                        )
                ));
    }

    @Test
    public void getQuestion() throws Exception {
        long questionId = 1;

        given(service.getQuestion(Mockito.anyInt())).willReturn(new Question());

        given(mapper.questionToQuestionDtoResponse(Mockito.any())).willReturn(generateQuestionResponse(1));

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(getQuestionUri(), questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").isNumber())
                .andExpect(jsonPath("$.title").isString())
                .andExpect(jsonPath("$.body").isString())
                .andExpect(jsonPath("$.createdAt").isString())
                .andExpect(jsonPath("$.writer").isMap())
                .andExpect(jsonPath("$.answers").isArray())
                .andDo(document("get-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID").attributes(key("constraints").value("0이상 정수"))
                        ),
                        responseFields(
                                getSingleQuestionDescriptor()
                        )
                ));

    }

    @Test
    public void patchQuestion() throws Exception {
        long questionId = 1;

        given(mapper.questionDtoPatchToQuestion(Mockito.any())).willReturn(new Question());

        given(service.editQuestion(Mockito.any())).willReturn(new Question());

        given(mapper.questionToQuestionDtoResponse(Mockito.any())).willReturn(generateQuestionResponse(1));

        ConstraintDescriptions postMemberConstraints = new ConstraintDescriptions(QuestionDto.Patch.class);
        List<String> titleConstraint = postMemberConstraints.descriptionsForProperty("title");
        List<String> bodyConstraint = postMemberConstraints.descriptionsForProperty("body");

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.patch(getQuestionUri() + "/edit", questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(gson.toJson(questionPatch(1))));

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.questionId").isNumber())
                .andExpect(jsonPath("$.title").isString())
                .andExpect(jsonPath("$.body").isString())
                .andExpect(jsonPath("$.createdAt").isString())
                .andExpect(jsonPath("$.writer").isMap())
                .andExpect(jsonPath("$.answers").isArray())
                .andDo(document("patch-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID").attributes(key("constraints").value("0이상 정수"))
                        ),
                        requestFields(
                                List.of(
                                        fieldWithPath("questionId").type(JsonFieldType.NUMBER).ignored(),
                                        fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목").optional().attributes(key("constraints").value(titleConstraint)),
                                        fieldWithPath("body").type(JsonFieldType.STRING).description("질문 내용").optional().attributes(key("constraints").value(bodyConstraint))
                                )
                        ),
                        responseFields(
                                getSingleQuestionDescriptor()
                        )
                ));
    }


    @Test
    public void getQuestions() throws Exception {
        String page = "1";
        String size = "10";
        String sort = "new";

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("page", page);
        params.add("size", size);
        params.add("sort", sort);

        given(service.getQuestions(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString())).willReturn(getPageData());

        given(mapper.questionsToMultiResponseDtos(Mockito.any())).willReturn(generateListQuestion(1));

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(getQuestionUrl() + "/board")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .params(params)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.pageInfo").isMap())
                .andExpect(jsonPath("$.pageInfo.page").isNumber())
                .andExpect(jsonPath("$.pageInfo.size").isNumber())
                .andExpect(jsonPath("$.pageInfo.totalElements").isNumber())
                .andExpect(jsonPath("$.pageInfo.totalPages").isNumber())
                .andDo(document("get-questions",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        requestParameters(
                                List.of(
                                        parameterWithName("page").description("Page 번호").attributes(key("constraints").value("0이상 정수")),
                                        parameterWithName("size").description("Page 사이즈").attributes(key("constraints").value("0이상 정수")),
                                        parameterWithName("sort").description("정렬 방식").attributes(key("constraints").value("'views','new','answered'"))
                                )
                        ),
                        responseFields(
                                getListDataWithPageDescriptor()
                        ))
                );
    }

    @Test
    public void getQuestionsHome() throws Exception {
        given(service.getQuestions(Mockito.anyInt(), Mockito.anyInt(), Mockito.anyString())).willReturn(getPageData());

        given(mapper.questionsToMultiResponseDtos(Mockito.any())).willReturn(generateListQuestion(1));

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.get(getQuestionUrl() + "/home")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.pageInfo").isEmpty())
                .andDo(document("get-questions-home",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        responseFields(
                                getListDataWithoutPageDescriptor()
                        ))
                );
    }

    @Test
    public void deleteQuestion() throws Exception {
        long questionId = 1;

        ResultActions actions = mockMvc.perform(
                RestDocumentationRequestBuilders.delete(getQuestionUri(), questionId)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        actions
                .andExpect(status().isNoContent())
                .andDo(document("delete-question",
                        preprocessRequest(prettyPrint()),
                        preprocessResponse(prettyPrint()),
                        pathParameters(
                                parameterWithName("question-id").description("질문 식별자 ID").attributes(key("constraints").value("0이상 정수"))
                        )
                ));
    }
}
