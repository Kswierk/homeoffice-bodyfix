import React from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';

import { backExcercises } from '../../excercisesData';
import { connect } from 'react-redux';
import { RootStateTypes } from '../../../reducers/rootReducer';
import { CgClose } from 'react-icons/cg';
import * as actionTypes from '../../../reducers/actions';
import Iframe from 'react-iframe';

const StyledModal = styled.div`
  position: relative;
  background-color: #fff;
  width: 85vw;
  max-width: 1200px;
  border-radius: 4px;
  z-index: 200;
  left: 50%;
  transform: translateX(-50%);
`;

const ModalWraper = styled.div`
  margin: 0 5%;
  padding: 35px 0 35px 0;
`;

const StepNumber = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 25px auto;
  background-color: #ddd;
`;

const StyledDescription = styled.p`
  text-align: center;
`;

const ExitButton = styled(CgClose)`
  font-size: 35px;
  position: absolute;
  right: 22px;
  top: 22px;
  cursor: pointer;
`;

const StyledVideo = styled(Iframe)`
  width: 90%;
  height: 40vw;
  margin: 40px auto;

  @media (min-width: 800px) {
    height: 350px;
    width: 550px;
  }
`;

type Props = {
  modalExcercise?: string | null;
  onCloseModal?: () => void;
};

const Modal = (props: Props) => {
  const { modalExcercise, onCloseModal } = props;
  const foundIndex = backExcercises.findIndex(
    (item) => item.name === modalExcercise
  );
  // <iframe
  //   width="560"
  //   height="315"
  //   src="https://www.youtube.com/embed/r9HdJ8P6GQI"
  //   frameborder="0"
  //   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  //   allowfullscreen
  // ></iframe>;

  return (
    <>
      <StyledModal>
        <ModalWraper>
          <ExitButton onClick={onCloseModal} />
          <StyledVideo url={backExcercises[foundIndex].link} />

          {backExcercises[foundIndex].description.map((item, index) => (
            <div key={index}>
              <StepNumber>{index + 1}</StepNumber>
              <StyledDescription>{item}</StyledDescription>
            </div>
          ))}
        </ModalWraper>
      </StyledModal>
      <Backdrop />
    </>
  );
};

const mapStateToProps = (state: RootStateTypes) => ({
  modalExcercise: state.modalExcercise,
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    onCloseModal: () => dispatch({ type: actionTypes.CLOSE_MODAL }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);