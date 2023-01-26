import { useId } from "react";
import * as S from "./styles";

const Pagination = (props) => {
  const { total, limit = 10, onChange, current } = props;

  const id = useId();

  const numberOfPages = Math.ceil(total / limit);

  if (numberOfPages === 1) return null;

  const onNext = () => {
    if (current !== numberOfPages) {
      onChange(current + 1);
    }
  };

  const onPrevious = () => {
    if (current !== 1) {
      onChange(current - 1);
    }
  };

  return (
    <S.Nav>
      <p role="status" id={id}>
        Page: {current}
      </p>
      <p>Total: {numberOfPages}</p>

      <S.OrganizedList>
        <li>
          <button
            aria-label="go to previous page"
            aria-describedby={id}
            aria-disabled={current !== 1}
            type="button"
            onClick={onPrevious}
          >
            Previous
          </button>
        </li>

        <li>
          <button
            aria-label="go to next page"
            aria-describedby={id}
            aria-disabled={current !== numberOfPages}
            type="button"
            onClick={onNext}
          >
            Next
          </button>
        </li>
      </S.OrganizedList>
    </S.Nav>
  );
};

export default Pagination;
