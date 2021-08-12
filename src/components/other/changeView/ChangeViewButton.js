import styled from "styled-components";

const Button = styled.button`
  border-radius: 2px;
  padding: 10px 15px;
  margin: 10px;
  background: gray;
  color: white;
  font-weight: bold;
  border: 1px solid rgb(122, 122, 122);
  outline: none;

  &:hover {
    transform: translateY(10px);
    transition: 500ms;
  }
`;
const Mask = styled.div`
  border-radius: 2px;
  padding: 10px 15px;
  margin: 10px;
  background: gray;
  color: white;
  font-weight: bold;
  border: 1px solid rgb(122, 122, 122);
  outline: none;

  &:hover {
    transform: translateY(10px);
    transition: 500ms;
  }
`;

export const ChangeViewButton = () => (
  <li class="content__item">
    <button class="button button--mimas">
      <span>View</span>
    </button>
  </li>
);
