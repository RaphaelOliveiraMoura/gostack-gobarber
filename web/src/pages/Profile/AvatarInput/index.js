import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import api from '~/services/api';
import { Container } from './styles';

export default function AvatarInput() {
  const { defaultValue, registerField } = useField('avatar');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref.current]);

  async function handleChange(event) {
    const data = new FormData();

    data.append('file', event.target.files[0]);

    const response = await api.post('/files', data);

    const { id, url } = response.data;
    setFile(id);
    setPreview(url);
  }

  return (
    <Container>
      <label htmlFor="avatar">
        <div>
          <img
            src={
              preview ||
              'https://api.adorable.io/avatars/120/abott@adorable.png'
            }
            alt="Profile"
          />
        </div>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}