import React from 'react';

import { Form, Button, Input } from 'antd';
import styles from './quickReply.less';

class QuickReplyFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.form.validateFields((errors, params) => {
      const pData = {
        ...params,
      };
      this.props.onSubmit(pData);
    });
  }

  render() {
    const FormItem = Form.Item;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={styles.searchBox}>
        <Form
          onSubmit={this.handleSubmit.bind(this)}
          className="searchWrapper"
          style={{ height: 40 }}
          autoComplete="off"
        >
          <FormItem label="" style={{ width: '13%', margin: 'auto' }}>
            {getFieldDecorator('keyword', {})(
              <Input placeholder="搜索关键词、内容" className={styles.searchInput} />
            )}
          </FormItem>

          <FormItem type="submit">
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(QuickReplyFilter);
