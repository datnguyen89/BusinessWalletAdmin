import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet/es/Helmet'
import DefaultLayout from '../../../layouts/DefaultLayout/DefaultLayout'
import { Button, Result } from 'antd'
import { useHistory } from 'react-router-dom'

const NotPermissionPage = props => {
  const history = useHistory()
  const handlerClickBackHome = () => {
    history.push('/')
  }
    return (
      <DefaultLayout>
        <Helmet>
          <title>Trang chủ</title>
        </Helmet>
        <Result
          status="403"
          title="403"
          subTitle="Bạn không có quyền truy cập trang này, vui lòng quay lại trang chủ."
          extra={<Button type="primary" onClick={handlerClickBackHome}>Back Home</Button>}
        />
      </DefaultLayout>
    );
};

NotPermissionPage.propTypes = {
    
};

export default NotPermissionPage;