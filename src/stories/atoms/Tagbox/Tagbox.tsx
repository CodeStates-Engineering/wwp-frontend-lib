import scss from './Tagbox.module.scss';
import { Tag, X, Plus } from 'react-feather';
import { useEffect, useState, useRef } from 'react';
import { useDepsState, useOpenedStateWithCloseExternalClick } from '@hooks';
import { cleanClassName } from '@utils';

export interface TagboxProps {
  value?: string[];
  onChange?: (value: string[]) => void;
  id?: string;
  className?: string;
  disabled?: boolean;
  invalid?: boolean;
  placeholder?: string;
  duplicationAllowed?: boolean;
  maxTagCount?: number;
  maxTextLength?: number;
}

/**
 * @deprecated
 * 로직 수정이 필요합니다.
 */
export function Tagbox({
  className,
  disabled,
  duplicationAllowed,
  value,
  onChange,
  maxTagCount,
  maxTextLength,
  placeholder,
  id,
  invalid,
}: TagboxProps) {
  const tagInputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [tagList, setTagList] = useDepsState(() => value ?? [], [value]),
    duplicated = tagList.includes(inputValue);
  const isOverMaxTextLength = maxTextLength ? maxTextLength < inputValue.length : false;
  const isOverMaxTagCount = maxTagCount ? maxTagCount <= tagList.length : false;
  const isDuplicated = !duplicationAllowed ? duplicated : false;

  const {
    openedState: [tagInputOpened, setTagInputOpened],
    preventCloseProps,
  } = useOpenedStateWithCloseExternalClick(false);

  //Tag 모달이 열리면 input 태그에 포커스
  useEffect(() => {
    const { current } = tagInputRef;
    if (current && tagInputOpened) current.focus();
  }, [tagInputOpened]);

  const isUnableAdd = isOverMaxTagCount || isDuplicated || !inputValue || isOverMaxTextLength;

  const addTag = () => {
    if (isUnableAdd) return;
    const addedTagList = [...tagList, inputValue];
    setTagList(addedTagList);
    onChange?.(addedTagList);
    setInputValue('');
  };

  const removeTag = (index: number) => {
    tagList.splice(index, 1) && setTagList([...tagList]);
    onChange?.(tagList);
  };

  return (
    <>
      <div
        {...preventCloseProps}
        className={cleanClassName(
          `${scss.tagbox} ${tagInputOpened && scss.opened} ${invalid && scss.invalid} ${
            disabled && scss.disabled
          } ${className}`
        )}
        onClick={() => {
          setTagInputOpened(!tagInputOpened);
        }}
        id={id}
      >
        <ul className={scss.tag_list}>
          {placeholder && tagList.length === 0 && (
            <li className={scss.tag_list_placeholder}>{placeholder}</li>
          )}
          {tagList.map((tag, index) => (
            <li className={scss.tag} key={index}>
              {tag}
              <button
                className={scss.delete_tag_button}
                onClick={(e) => {
                  e.stopPropagation();
                  removeTag(index);
                }}
              >
                <X />
              </button>
            </li>
          ))}
        </ul>
        <div className={scss.tag_icon_wrap}>
          <Tag />
        </div>
      </div>
      {tagInputOpened && (
        <div
          {...preventCloseProps}
          className={scss.tag_modal}
          onClick={() => tagInputRef.current?.focus()}
        >
          <div
            className={cleanClassName(
              `${scss.input_container} ${scss.disabled_box_shadow} ${disabled && scss.disabled}`
            )}
          >
            <input
              className={scss.tagbox_input}
              placeholder="추가할 태그를 입력해주세요."
              value={inputValue}
              ref={tagInputRef}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Enter') return;
                e.preventDefault();
                addTag();
              }}
              name={id}
            />
            <button
              className={scss.tag_add_button}
              type="button"
              disabled={isUnableAdd}
              onClick={addTag}
            >
              <Plus />
            </button>
          </div>
          <p
            className={cleanClassName(
              `${scss.prevent_message} ${inputValue && isUnableAdd && scss.show}`
            )}
          >
            {isOverMaxTagCount
              ? `태그는 최대 ${maxTagCount}개까지 입력 가능합니다.`
              : isDuplicated
              ? '이미 존재하는 태그입니다.'
              : isOverMaxTextLength && `${maxTextLength}자 이내로 입력해 주세요.`}
          </p>
        </div>
      )}
    </>
  );
}
