package synergy_overflow.helper.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import synergy_overflow.member.dto.MemberDto;
import synergy_overflow.member.entity.Member;
import synergy_overflow.question.dto.MultiResponseDto;
import synergy_overflow.question.dto.QuestionDto;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.AnswerDto;
import synergy_overflow.question.temporaries.temporaryDtos.CommentsDto;

import java.time.LocalDateTime;
import java.util.List;

public abstract class QuestionStubData {
    private final String QUESTION_URL = "/questions";
    public String getQuestionUrl(){return QUESTION_URL;}
    public String getQuestionUri(){
        String QUESTION_URI = "/{question-id}";
        return QUESTION_URL+ QUESTION_URI;}

    public QuestionDto.Post questionPost(long number){
        return QuestionDto.Post.builder()
                .body(number + " 질문 내용, 문자수 20이 넘어야 됩니다.")
                .title(number + " 질문 제목")
                .build();
    }

    public QuestionDto.Patch questionPatch(long number){
        return QuestionDto.Patch.builder()
                .body(number + " 질문 내용, 문자수 20이 넘어야 됩니다.")
                .title(number + " 질문 제목")
                .build();
    }

    public List<MultiResponseDto.MultiQuestionsResponse> generateListQuestion(long number){
       return List.of(MultiResponseDto.MultiQuestionsResponse.builder()
               .questionId(number)
               .views(0)
               .title(number + " 질문 제목")
               .answerNumber(1)
               .writer(generateWriterResponse(number))
               .createdAt(generateLocalDateTime())
               .adopted(false)
               .build());
    }
    public Page<Question> getPageData(){
        return new PageImpl<>(List.of(new Question()),
                PageRequest.of(0,10, Sort.by("questionId").descending()),1);
    }


    public QuestionDto.Response generateQuestionResponse(long number){
        return QuestionDto.Response.builder()
                .questionId(number)
                .title(number + " 질문 제목")
                .body(number + " 질문 내용")
                .writer(generateWriterResponse(number))
                .createdAt(generateLocalDateTime())
                .answers(List.of(generateAnswerResponse(number)))
                .build();
    }
    public MemberDto.Response generateWriterResponse(long number){
        return MemberDto.Response.builder().nickname(number+" 멤버").memberId(number).build();
    }

    public AnswerDto.Response generateAnswerResponse(long number){
        return AnswerDto.Response.builder()
                .answerId(number)
                .answerBody(number+" 질문 내용")
                .adopted(false)
                .createdAt(generateLocalDateTime())
                .comments(List.of(generateCommentResponse(1)))
                .writer(generateWriterResponse(1))
                .build();
    }
    public CommentsDto.Response generateCommentResponse(long number){
        return CommentsDto.Response.builder()
                .answerId(number)
                .commentId(number)
                .commentBody(number + " 댓글 내용")
                .createdAt(generateLocalDateTime())
                .writer(generateWriterResponse(number))
                .build();
    }
    public LocalDateTime generateLocalDateTime(){
        return LocalDateTime.of(2023,1,1,00,00,00,00);
    }
}
