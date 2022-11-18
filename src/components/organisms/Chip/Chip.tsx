import scss from './Chip.module.scss';
import { cleanClassName } from '../../../utils';
import { X } from 'react-feather';
import { Modal } from '../../molecules/Modal/Modal';
import { useState } from 'react';

export interface ChipProps {
  children?: React.ReactNode;
  className?: string;
  onDelete?: () => void;
  deleteDisabled?: boolean;
}
export function Chip(props: ChipProps) {
  const [isExisted, setIsExisted] = useState(true);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  return (
    <>
      <Modal
        opened={deleteModalOpened}
        modalType="center"
        title="정말로 삭제하시겠습니까?"
        onClose={() => setDeleteModalOpened(false)}
        buttonsOptions={[
          {
            fontWeight: 'bold',
            fontSize: 'normal',
            theme: 'wewin-peach500',
            children: '네, 삭제합니다.',
            onClick: (closeModal) => {
              setIsExisted(false);
              closeModal();
            },
          },
        ]}
      />
      {isExisted ? (
        <div className={cleanClassName(`${scss.chip} ${props.className}`)}>
          <label className={scss.label}>{props.children}</label>
          <button
            className={scss.delete_button}
            onClick={() => {
              setDeleteModalOpened(false);
              setTimeout(() => setDeleteModalOpened(true));
            }}
            disabled={props.deleteDisabled}
          >
            <X />
          </button>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
