package synergy_overflow.helper.question;

import org.springframework.restdocs.payload.FieldDescriptor;
import org.springframework.restdocs.payload.JsonFieldType;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;

public interface QuestionRestDocsDescriptor {
    default List<FieldDescriptor> getWriterDescriptor(String prePath, String object) {
        return List.of(
                fieldWithPath(prePath + "writer").type(JsonFieldType.OBJECT).description(object + " 작성자 데이터"),
                fieldWithPath(prePath + "writer.memberId").type(JsonFieldType.NUMBER).description(object + " 작성자 식별자"),
                fieldWithPath(prePath + "writer.nickname").type(JsonFieldType.STRING).description(object + " 작성자 이름")
        );
    }

    default FieldDescriptor getDateDescriptor(String prePath, String object) {
        return fieldWithPath(prePath + "createdAt").type(JsonFieldType.STRING).description(object + " 생성 시간");
    }

    default List<FieldDescriptor> getListDataDescriptor() {
        Stream<FieldDescriptor> questionWriter = getWriterDescriptor("data[].", "질문글").stream();
        Stream<FieldDescriptor> questionList = List.of(
                fieldWithPath("data").type(JsonFieldType.ARRAY).description("질문 리스트 정보"),
                fieldWithPath("data[].questionId").type(JsonFieldType.NUMBER).description("질문글 식별자"),
                fieldWithPath("data[].title").type(JsonFieldType.STRING).description("질문글 제목"),
                fieldWithPath("data[].adopted").type(JsonFieldType.BOOLEAN).description("답변 채택 유무"),
                fieldWithPath("data[].views").type(JsonFieldType.NUMBER).description("조회수"),
                fieldWithPath("data[].answerNumber").type(JsonFieldType.NUMBER).description("답변수"),
                getDateDescriptor("data[].", "질문글")
        ).stream();
        return Stream.concat(questionWriter, questionList).collect(Collectors.toList());
    }

    default List<FieldDescriptor> getListDataWithoutPageDescriptor() {
        Stream<FieldDescriptor> pageInfo = List.of(fieldWithPath("pageInfo").type(JsonFieldType.NULL).description("페이지 정보")).stream();
        return Stream.concat(getListDataDescriptor().stream(), pageInfo).collect(Collectors.toList());
    }

    default List<FieldDescriptor> getListDataWithPageDescriptor() {
        Stream<FieldDescriptor> questionList = List.of(
                fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보"),
                fieldWithPath("pageInfo.page").type(JsonFieldType.NUMBER).description("현재 페이지 위치"),
                fieldWithPath("pageInfo.size").type(JsonFieldType.NUMBER).description("현재 페이지 사이즈"),
                fieldWithPath("pageInfo.totalElements").type(JsonFieldType.NUMBER).description("총 사이즈"),
                fieldWithPath("pageInfo.totalPages").type(JsonFieldType.NUMBER).description("총 페이지 수")
        ).stream();
        return Stream.concat(getListDataDescriptor().stream(), questionList).collect(Collectors.toList());
    }


    default List<FieldDescriptor> getSingleQuestionDescriptor() {

        Stream<FieldDescriptor> questionResponse = List.of(
                fieldWithPath("questionId").type(JsonFieldType.NUMBER).description("질문 작성자 식별자"),
                fieldWithPath("title").type(JsonFieldType.STRING).description("질문 제목"),
                fieldWithPath("body").type(JsonFieldType.STRING).description("질문 내용"),
                getDateDescriptor("", "질문")
        ).stream();

        Stream<FieldDescriptor> questionWriter = getWriterDescriptor("", "질문").stream();

        Stream<FieldDescriptor> questionDescriptor = Stream.concat(questionResponse, questionWriter);
        Stream<FieldDescriptor> answersDescriptor = getAnswersDescriptor("answers");
        Stream<FieldDescriptor> commentsDescriptor = getCommentsDescriptor("answers[].comments");

        return Stream.of(questionDescriptor, answersDescriptor, commentsDescriptor).flatMap(descriptorStream -> descriptorStream).collect(Collectors.toList());
    }

    default Stream<FieldDescriptor> getAnswersDescriptor(String prePath) {

        Stream<FieldDescriptor> answerResponse = List.of(
                fieldWithPath(prePath).type(JsonFieldType.ARRAY).description("답변 정보"),
                fieldWithPath(prePath + "[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                fieldWithPath(prePath + "[].answerBody").type(JsonFieldType.STRING).description("답변 내용"),
                fieldWithPath(prePath + "[].adopted").type(JsonFieldType.BOOLEAN).description("답변 채택 정보"),
                getDateDescriptor(prePath + "[].", "답변")
        ).stream();

        Stream<FieldDescriptor> answerWriterResponse = getWriterDescriptor(prePath + "[]", "답변").stream();

        return Stream.concat(answerResponse, answerWriterResponse);
    }

    default Stream<FieldDescriptor> getCommentsDescriptor(String prePath) {
        Stream<FieldDescriptor> commentResponse = List.of(
                fieldWithPath(prePath).type(JsonFieldType.ARRAY).description("댓글 정보"),
                fieldWithPath(prePath + "[].answerId").type(JsonFieldType.NUMBER).description("답변 식별자"),
                fieldWithPath(prePath + "[].commentId").type(JsonFieldType.NUMBER).description("댓글 식별자"),
                fieldWithPath(prePath + "[].commentBody").type(JsonFieldType.STRING).description("댓글 내용"),
                getDateDescriptor(prePath + "[].", "댓글")
        ).stream();

        Stream<FieldDescriptor> commentWriterResponse = getWriterDescriptor(prePath + "[]", "댓글").stream();

        return Stream.concat(commentResponse, commentWriterResponse);
    }
}