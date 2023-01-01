import { useContext } from 'react';
import { Context } from '../Context';

const Pagination = ({ currentPage, totalPage, mobileSlide }) => {
  const { setActivePage } = useContext(Context);

  let pageArr = [1, 2, 3, 4, 5, '\u00B7\u00B7\u00B7', totalPage];

  if (totalPage >= 9 && currentPage >= 5 && currentPage <= totalPage - 4) {
    pageArr = [
      1,
      '\u00B7\u00B7\u00B7',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '\u00B7\u00B7\u00B7',
      totalPage,
    ];
  } else if (totalPage >= 9 && currentPage > totalPage - 4) {
    pageArr = [
      1,
      '\u00B7\u00B7\u00B7',
      totalPage - 4,
      totalPage - 3,
      totalPage - 2,
      totalPage - 1,
      totalPage,
    ];
  } else if (totalPage <= 8) {
    pageArr = Array.from(Array(totalPage), (e, i) => i + 1);
  }

  const handlePageClick = (pageNum, index) => {
    if (pageNum !== '\u00B7\u00B7\u00B7') {
      setActivePage(pageNum);
    } else {
      // If '...' is clicked...
      if (pageArr.length / 2 > index) {
        setActivePage(pageArr[index + 1] - 1);
      } else {
        setActivePage(pageArr[index - 1] + 1);
      }
    }

    // On every page change, go to the top of the page.
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera

    // Resets mobile slider
    mobileSlide?.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        disabled={currentPage === 1}
        onClick={() => (
          setActivePage(currentPage - 1),
          (document.body.scrollTop = 0),
          (document.documentElement.scrollTop = 0)
        )}
        title="Previous page"
      >
        <h3>&lt;</h3>
      </button>
      {pageArr.map((item, index) => (
        <button
          className="pagination-button"
          key={index}
          onClick={() => handlePageClick(item, index)}
        >
          <h3
            className={`pagination-button-number ${
              currentPage === item ? 'active' : ''
            }`}
          >
            {item}
          </h3>
        </button>
      ))}
      <button
        className="pagination-button"
        disabled={currentPage === totalPage}
        onClick={() => (
          setActivePage(currentPage + 1),
          (document.body.scrollTop = 0),
          (document.documentElement.scrollTop = 0)
        )}
        title="Next page"
      >
        <h3>&gt;</h3>
      </button>
    </div>
  );
};

export default Pagination;
