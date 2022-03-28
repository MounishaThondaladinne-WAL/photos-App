import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import Photo from "./Photo";
import {
  Container,
  Row,
  Col,
  Pagination,
  PaginationItem,
  PaginationLink,
  Spinner,
} from "reactstrap";
const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [spin, setSpin] = useState(false);
  const [pages, setPages] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const firstPage = pages[0];
  const lastPage = pages[9];
  const totalPages = 100;
  const newPages = [];
  useEffect(() => {
    setSpin(true);
    axios
      .get(`https://jsonplaceholder.typicode.com/albums/${pageNumber}/photos`)
      .then((res) => {
        setPhotos(res.data);
        setSpin(false);
      });
  }, [pageNumber]);
  const previousPage = () => {
    if (pageNumber > firstPage) {
      setPageNumber(pageNumber - 1);
    } else {
      if (pageNumber > 1) {
        for (let i = firstPage - 10; i <= lastPage - 10; i++) {
          newPages.push(i);
        }
        setPages(newPages);
        setPageNumber(pageNumber - 1);
      }
    }
  };
  const nextPage = () => {
    if (pageNumber < lastPage) {
      setPageNumber(pageNumber + 1);
    } else {
      if (lastPage < 100) {
        for (let i = lastPage + 1; i <= lastPage + 10; i++) {
          newPages.push(i);
        }
        setPages(newPages);
        setPageNumber(pageNumber + 1);
      }
    }
  };
  const backWard = () => {
    if (firstPage > 1) {
      for (let i = firstPage - 10; i < firstPage; i++) {
        newPages.push(i);
      }
      setPages(newPages);
      setPageNumber(newPages[0]);
    }
  };
  const forWard = () => {
    if (lastPage < totalPages) {
      for (let i = lastPage + 1; i <= lastPage + 10; i++) {
        newPages.push(i);
      }
      setPages(newPages);
      setPageNumber(newPages[9]);
    }
  };
  return (
    <div>
      <Container>
        <Row>
          <Col tag="h1" className="p-2">
            PHOTO GALLERY
          </Col>
        </Row>
        <Row tag="h3" className="p-2">
          <Col>Album : {pageNumber}</Col>
        </Row>
        {spin ? (
          <Spinner className="m-5">Lodaing...</Spinner>
        ) : (
          <Row>
            {photos.map((val) => {
              return (
                <Col md="4" lg="3" sm="6" xs="6">
                  <Photo
                    title={val.title}
                    image={val.thumbnailUrl}
                    fullimage={val.url}
                  />
                </Col>
              );
            })}
          </Row>
        )}
      </Container>
      <footer className="footer">
        <Pagination size="sm">
          <PaginationItem>
            <PaginationLink first href="#" onClick={backWard} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" previous onClick={previousPage} />
          </PaginationItem>
          {pages.map((val) => {
            return (
              <PaginationItem active={pageNumber === val}>
                <PaginationLink
                  href="#"
                  onClick={() => {
                    setPageNumber(val);
                  }}
                >
                  {val}
                </PaginationLink>
              </PaginationItem>
            );
          })}
          <PaginationItem>
            <PaginationLink href="#" next onClick={nextPage} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" last onClick={forWard} />
          </PaginationItem>
        </Pagination>
      </footer>
    </div>
  );
};
export default Photos;
