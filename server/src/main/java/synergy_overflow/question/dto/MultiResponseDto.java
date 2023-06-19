package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import synergy_overflow.member.dto.MemberDto;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class MultiResponseDto {
    private List<MultiQuestionsResponse> data; // 따로 response dto
    private PageInfo pageInfo;


    public MultiResponseDto(List<MultiQuestionsResponse> data, Page page) {
        this.data = data;
        this.pageInfo = PageInfo.builder()
                .page(page.getNumber()+1)
                .size(page.getSize())
                .totalElements(page.getTotalElements())
                .totalPages(page.getTotalPages())
                .build();
    }
    public MultiResponseDto(List<MultiQuestionsResponse> data) {
        this.data = data;
        this.pageInfo = null;
    }

    @Getter
    @Builder
    public static class MultiQuestionsResponse{
        private long questionId;
        private String title;
        private LocalDateTime createdAt;
        private boolean adopted;
        private int views;
        private MemberDto.Response writer;
        private int answerNumber;
    }

    @Getter
    @Builder
    public static class PageInfo{
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
    }
}
