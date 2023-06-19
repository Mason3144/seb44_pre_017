package synergy_overflow.question.dto;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.domain.Page;
import synergy_overflow.question.entity.Question;
import synergy_overflow.question.temporaries.temporaryDtos.WriterDto;

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

    @Getter
    @Builder
    public static class MultiQuestionsResponse{
        private long question_id;
        private String title;
        private LocalDateTime created_at;
        private boolean adopted;
        private int views;
        private WriterDto.Response writer;
        private int comment_number;
    }

    @Getter
    @Builder
    private static class PageInfo{
        private int page;
        private int size;
        private long totalElements;
        private int totalPages;
    }
}
