import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet/es/Helmet'
import DefaultLayout from '../../../layouts/DefaultLayout/DefaultLayout'
import { Button, Result } from 'antd'
import {useHistory} from 'react-router-dom'
import { NotFoundPageWrapper } from './NotFoundPageStyled'

const NotFoundPage = props => {
  const history = useHistory()
  const handlerClickBackHome = () => {
    history.push('/')
  }
    return (
      <DefaultLayout>
        <Helmet>
          <title>404</title>
        </Helmet>
        <NotFoundPageWrapper>
          <Result
            status="404"
            title="404"
            subTitle="Trang không tồn tại, vui lòng quay lại trang chủ."
            extra={<Button type="primary" onClick={handlerClickBackHome}>Về trang chủ</Button>}
          />
        </NotFoundPageWrapper>
      </DefaultLayout>
    );
};

NotFoundPage.propTypes = {
    
};

export default NotFoundPage;