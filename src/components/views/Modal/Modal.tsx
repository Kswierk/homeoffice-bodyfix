import React, { useEffect } from 'react';
import styled from 'styled-components';
import Backdrop from './Backdrop';

import { allExcercises } from '../../excercisesData';
import { connect } from 'react-redux';
import { RootStateTypes } from '../../../reducers/rootReducer';
import { CgClose } from 'react-icons/cg';
import * as actionTypes from '../../../reducers/actions';
import Iframe from 'react-iframe';

const StyledModal = styled.div`
  position: absolute;
  background-color: #fff;
  width: 85vw;
  max-width: 1200px;
  border-radius: 4px;
  z-index: 600;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const ModalWraper = styled.div`
  margin: 10px 5%;
  padding: 35px 0 35px 0;
  max-height: 90vh;
  overflow-y: scroll;
`;

const StepNumber = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  margin: 25px auto;
  background-color: rgba(239, 239, 239, 1);
`;

const StyledDescription = styled.p`
  text-align: center;
  line-height: 2rem;
`;

const ExitButton = styled(CgClose)`
  font-size: 40px;
  position: relative;
  /* left: 65vw; */
  cursor: pointer;
`;
const FlexContainer = styled.div`
  display: flex;
  width: 96%;
  justify-content: space-between;
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
  modalExcercise: string | null;
  onCloseModal: () => void;
};

interface IItem {
  name: string;
  description: string[];
  link: string;
}

const Modal = (props: Props) => {
  const { modalExcercise, onCloseModal } = props;

  const foundIndex = allExcercises.findIndex(
    (item: IItem) => item.name === modalExcercise
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <StyledModal>
        <ModalWraper>
          <FlexContainer>
            <span></span>
            <ExitButton onClick={onCloseModal}></ExitButton>
          </FlexContainer>
          <StyledVideo url={allExcercises[foundIndex].link} />

          {allExcercises[foundIndex].description.map(
            (item: string, index: number) => (
              <div key={index}>
                <StepNumber>{index + 1}</StepNumber>
                <StyledDescription>{item}</StyledDescription>
              </div>
            )
          )}
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
