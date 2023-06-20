import * as S from './Comment.styled';
function Comment() {
  return (
    <S.Container>
      <S.Comment>Wrap the publisher in a Mono from or a Flux from</S.Comment>-
      <S.Writer>작성자</S.Writer>
      <S.CreatedAt>작성시간</S.CreatedAt>
    </S.Container>
  );
}
export default Comment;
