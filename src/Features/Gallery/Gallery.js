import { Fragment, useState } from "react";
import useGallery from "./Hooks/useGallery";

import { Pagination } from "../../Navigation";
import { Modal } from "../../DataDisplay";
import * as S from "./styles";

const Gallery = () => {
  const [current, setCurrent] = useState(1);
  const [isOpen, setIsOpen] = useState({});

  const { data, isLoading, error } = useGallery({
    path: `images?page=${current}`,
  });

  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h2>Gallery</h2>

      <S.UnorderedList>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          data.items.map((d, index) => (
            <Fragment key={d.url}>
              <li>
                <S.Button
                  aria-haspopup={true}
                  aria-label="open modal photo"
                  aria-describedby={d.alt_description}
                  type="button"
                  onClick={() => setIsOpen({ [index]: true })}
                >
                  <S.Image
                    alt={d.alt_description}
                    src={`${d.url}.jpg`}
                    height="100px"
                    width="100px"
                    loading="eager"
                    decoding="sync"
                  />
                </S.Button>
              </li>

              {isOpen[index] && (
                <Modal onClose={() => setIsOpen({ [index]: false })}>
                  <S.Modalmage
                    loading="eager"
                    src={`${d.url}.jpg`}
                    alt={d.alt_description}
                  />
                </Modal>
              )}
            </Fragment>
          ))
        )}
      </S.UnorderedList>

      <footer>
        <Pagination
          current={current}
          onChange={setCurrent}
          total={data?.total || 0}
        />
      </footer>
    </>
  );
};

export default Gallery;
