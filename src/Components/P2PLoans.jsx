import React, { useEffect, useState,useCallback} from 'react';
import { Form, Table, Button, Input, Space, Select, DatePicker, InputNumber,Popconfirm } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined ,CopyOutlined,FilterOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Typography } from '@mui/material';
import axios from 'axios';
const { Option } = Select;
const MyTable = () => {
  const [form] = Form.useForm();
  // const FilterIcon = () => <FilterOutlined />;
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [isRowEditing, setIsRowEditing] = useState(false);
  const HeaderStyle ={
    backgroundColor:"#0576ff",
    color:"white"
  }
  const [dataSource, setDataSource] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const token = localStorage.getItem('accessToken');

  const instance =axios.create(
    {
      baseURL:"https://api.p360.build:6060/v1/fundflow",
      headers:{  Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',}
    }
   )
   const getData = useCallback(() => {
    try {
      instance
        .get('/colevis/getCoLevies')
        .then((res) => {
          console.log(res.data.data);
          setDataSource(res.data.data);
        })
        .catch((err) => {
          console.error('Error:', err);
        });
    } catch (err) {
      console.error('Error:', err);
    }
  }, [instance]);

  useEffect(() => {
    getData();
    }, []);

  const postDataApi =(newData, callback)=>{
    try{
      instance.post('https://api.p360.build:6060/v1/fundflow/colevis/addCoLevies',{
        transactionType:newData.transactionType,
        documentData:newData.documentDate ,
        year: newData.year,
        period:newData.period ,
        reference:newData.reference ,
        paymentProject:newData.paymentProject ,
        receiptProject: newData.receiptProject,
        ledger:newData.receiptProject ,
        amount:newData.amount ,
        status:newData.status ,
        createdDate:newData.createdDate ,
        createdBy:newData.createdBy ,
        submittedOn:newData.submittedOn ,
        submittedBy:newData.submittedBy
      })
      .then((response)=>{
      console.log('New row data saved:', response.data);
      callback(response.data);
      getData();})
      .catch((err) => {
        console.error('Error:', err);
      });
    }catch(err){
      console.error('Error:', err);
    }
  }



  const columns = [
    {
      title: 'Type',
      dataIndex: 'transactionType',
      width: '10%',
      key: 'transactionType',
      render: (text, record) => renderCell(record, 'transactionType', text),
    },
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
      render: (text, record) => renderNumberCell(record, 'id', text),
    },
    {
      title: 'Document Number',
      dataIndex: 'DocumentNumber',
      width: '15%',
      key: 'DocumentNumber',
      render: (text, record) => renderCell(record, 'DocumentNumber', text),
    },
    {
      title: 'Document Date',
      dataIndex: 'documentDate',
      width: '15%',
      key: 'documentDate',
      render: (text, record) => renderDateCell(record, 'documentDate', text),
      
    },
    {
      title: 'year',
      dataIndex: 'year',
      width: '10%',
      key: 'year',
      render: (text, record) => renderYearCell(record, 'year', text),
    },
    {
      title: 'period',
      dataIndex: 'period',
      width: '10%',
      key: 'period',
      render: (text, record) => renderCell(record, 'period', text),
    },
    {
      title: 'reference',
      dataIndex: 'reference',
      width: '20%',
      key: 'reference',
      render: (text, record) => renderCell(record, 'reference', text),
    },
    {
      title: 'Payment Project',
      dataIndex: 'PaymentProject',
      width: '10%',
      key: 'PaymentProject',
      render: (text, record) => renderCell(record, 'PaymentProject', text),
    },
    {
      title: 'Receipt Project',
      dataIndex: 'ReceiptProject',
      width: '10%',
      key: 'ReceiptProject',
      render: (text, record) => renderCell(record, 'ReceiptProject', text),
      
    },
    {
      title: 'Ledger',
      dataIndex: 'Ledger',
      width: '20%',
      key: 'Ledger',
      render: (text, record) => renderLedgerCell(record, 'Ledger', text),
      
    },
    {
      title: 'amount',
      dataIndex: 'amount',
      width: '10%',
      key: 'amount',
      render: (text, record) => renderNumberCell(record, 'amount', text),
      
    },
    {
      title: 'status',
      dataIndex: 'status',
      width: '10%',
      key: 'status',
      render: (text, record) => renderStatusCell(record, 'status', text),
    },
    {
      title: 'Entry Date',
      dataIndex: 'createdDate',
      width: '10%',
      key: 'createdDate',
      render: (text, record) => renderDateCell(record, 'createdDate', text),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      width: '10%',
      key: 'createdBy',
      render: (text, record) => renderCell(record, 'createdBy', text),
    },
    {
      title: 'Submitted On',
      dataIndex: 'submittedOn',
      width: '10%',
      key: 'submittedOn',
      render: (text, record) => renderDateCell(record, 'submittedOn', text),
    },
    {
      title: 'Submitted By',
      dataIndex: 'submittedBy',
      width: '10%',
      key: 'submittedBy',
      render: (text, record) => renderCell(record, 'submittedBy', text),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: '7%',
      fixed: 'right',
      key: 'Action',
      render: (text, record) => {
        const isSubmitted = record.status === 'Submitted'; 
        return (
          <Space>
            {editRow === record ? (
              <>
                <Popconfirm
                  title="Sure to save?"
                  onConfirm={() => handleSaveEdit(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" icon={<SaveOutlined />} />
                </Popconfirm>
                <Popconfirm
                  title="Sure to cancel?"
                  onConfirm={() => handleEditCancel(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="link" icon={<CloseOutlined />} danger />
                </Popconfirm>
              </>
            ) : (
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditStart(record)}
                  disabled={isSubmitted} // Disable the edit button for rows with the "Submitted" status
                />
                <Button
                  type="link"
                  icon={<CopyOutlined />}
                  onClick={() => handleDuplicate(record)}
                />
              </>
            )}
          </Space>
        );
      },
    },
     
  ];

 
  const renderLedgerCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;

    if (isEditing) {
      return (
        <Form.Item
         name="Ledger"
         rules={[
          {
            required:true,
            message:"please enter Ledger"
          }
         ]}>
          
        <Select
          style={{ width: 200 }}
          value={editedData[record.key]?.Ledger || text}
          onChange={(value) => handleEditInputChange(value, record, 'Ledger')}
        >
          <Option value="CO Levies - Advance Tax 1%">CO Levies - Advance Tax 1%</Option>
          <Option value="CO Levies - Admin Charges 4%">CO Levies - Admin Charges 4%</Option>
          <Option value="CO Levies - Ad charges 1% B2B">CO Levies - Ad charges 1% B2B</Option>
        </Select>
        </Form.Item>
      );
    }

    return text;
  };

  const handleDuplicate = (record) => {
    const duplicateItem = { ...record };
    duplicateItem.key = (dataSource.length + 1).toString();

    setDataSource([duplicateItem, ...dataSource]);
       setEditRow(duplicateItem);
       setIsAddButtonDisabled(true)
  };

  const renderCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;

    if (isEditing) {
      if (dataIndex === 'transactionType') {
        return (
          <Select
            style={{ width: '100%' }}
            value={editedData[record.key]?.transactionType || text}
            onChange={(value) => handleEditInputChange(value, record, 'transactionType')}
          >
            <Option value="BLR">BLR</Option>
            <Option value="CO">CO</Option>
            <Option value="HYD">HYD</Option>
            <Option value="RAN">RAN</Option>
            {/* Add more options as needed */}
          </Select>
        );
      } else {
        return (
          <Input
            value={editedData[record.key]?.[dataIndex] || text}
            onChange={(e) => handleEditInputChange(e.target.value, record, dataIndex)}
            style={{ width: '100%' }}
          />
        );
      }
    }

    return text;
  };

  const renderStatusCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;
    const isSubmitted = record && record.status === 'Submitted'; // Add a null check here
  
    let cellStyle = {};
  
    if (isEditing) {
      return (
        <Select
          style={{ width: '100%' }}
          value={editedData[record.key]?.status || text}
          onChange={(value) => handleEditInputChange(value, record, 'status')}
        >
          <Option value="Draft">Draft</Option>
          <Option value="Submitted">Submitted</Option>
        </Select>
      );
    }
    if (isSubmitted) {
      // Disable the edit button for rows with the "Submitted" status
      return (
        <span style={{ ...cellStyle, padding: '4px', borderRadius: '4px',color: 'white', backgroundColor: '#5db8fc'  }}>{text}</span>
      );
    } else {
      // Enable the edit button for rows with other statuses
      return (
        <span style={{ ...cellStyle, padding: '4px', borderRadius: '4px',color: 'white', backgroundColor: '#fc6f65' }}>
          {text}
        </span>
      );
    }
  };
  
  
  const renderYearCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;

    if (isEditing) {
      return (
        <DatePicker
          style={{ width: '100%' }}
          picker="year"
          value={editedData[record.key]?.[dataIndex] ? moment(editedData[record.key][dataIndex], 'YYYY') : null}
          onChange={(date, dateString) => handleEditInputChange(dateString, record, dataIndex)}
        />
      );
    }

    return text;
  };
  const renderDateCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;
    // const dateFormat = 'YYYY-MM-DD'; // Change the date format as needed
  
    if (isEditing) {
      return (
        <DatePicker
        style={{ width: '100%' }}
        format="DD-MM-YYYY"
        value={editedData[record.key]?.[dataIndex] ? moment(editedData[record.key][dataIndex], 'DD-MM-YYYY') : null}
        onChange={(date, dateString) => handleEditInputChange(dateString, record, dataIndex)}
      />
      );
    }
  
    return text;
  };
  
  const handleEditInputChange = (value, record, field) => {
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [record.key]: {
        ...(prevEditedData[record.key] || {}),
        [field]: value,
      },
    }));
  };
  
  

  const renderNumberCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;

    if (isEditing) {
      return (
        <InputNumber
          style={{ width: '100%' }}
          value={editedData[record.key]?.[dataIndex] || text}
          onChange={(value) => handleEditInputChange(value, record, dataIndex)}
        />
      );
    }

    return text;
  };

  const handleEditStart = (record) => {
    setIsRowEditing(true);
    setEditRow(record);
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [record.key]: { ...record },
    }));
  };
  
 
  const handleEditCancel = (record) => {
    if (editedData[record.key]) {
      // Check if it's a saved row by comparing with the initialDataSource
      const isSavedRow = dataSource.find((item) => item.key === record.key);
      
      if (isSavedRow) {
        // Reset the data source with the initial data for saved rows
        setDataSource((prevDataSource) => {
          return prevDataSource.map((item) =>
            item.key === record.key ? dataSource.find((i) => i.key === item.key) : item
          );
        });
      }
      
      setEditedData((prevEditedData) => {
        delete prevEditedData[record.key];
        return prevEditedData;
      });
    } else {
      setDataSource((prevDataSource) => {
        const newData = prevDataSource.filter((item) => item.key !== record.key);
        return newData;
      });
    }
    
    setEditRow(null);
    setIsAddButtonDisabled(false);
    setIsRowEditing(false);
  };
  
  
  

  const handleSaveEdit = (record) => {
    if (editedData[record.key]) {
      const newData = editedData[record.key];
      setDataSource((prevDataSource) => {
        return prevDataSource.map((item) => {
          if (item.key === record.key) {
            return { ...item, ...newData };
          }
          return item;
        });
      });
  
      setEditRow(null);
      setEditedData((prevEditedData) => {
        delete prevEditedData[record.key];
        return prevEditedData;
      });
      const lastKey = (parseInt(dataSource[dataSource.length - 1].key) + 1).toString();
      const isNewRow = dataSource.findIndex((item) => item.key === record.key) === -1;
      if (isNewRow) {
        
        setDataSource([...dataSource, { ...record, key: lastKey }]);
      }
  
      setIsAddButtonDisabled(false);
      setIsRowEditing(false);
  
      // Call postDataApi with the updated dataSource and a callback function
      postDataApi([...dataSource, { ...record, key: lastKey }], (responseData) => {
        // Update the table with the response data
        setDataSource(responseData);
      });
    }
  };
  
  const handleAddItem = () => {
    const newItem = {
      key: Date.now(), 
      transactionType: '',
      id: '',
      DocumentNumber: '',
      documentDate: "",
      year: "",
      period: '',
      reference: '',
      PaymentProject: '',
      ReceiptProject: '',
      Ledger: '',
      amount: "",
      status: '',
      createdDate: "",
      createdBy: '',
      submittedOn: "",
      submittedBy: '',
    };
  
    setDataSource([newItem, ...dataSource]);
    setEditRow(newItem);
    setIsAddButtonDisabled(true); // Disable the "Add" button after adding a new row
  };
  return (
    <div style={{ display: 'flex' }}>
      {/* <Sidebar2></Sidebar2> */}
      <div style={{ padding: '25px', width: '100%' }}>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h4">P2P Loans</Typography>
          <Button
        type="primary"
        onClick={handleAddItem}
        style={{ marginBottom: 16 }}
        disabled={isAddButtonDisabled||isRowEditing || (editRow && editRow.status === 'AddOn')}
      >
        Add
      </Button>

        </div>
        <Form form={form} >
  <Table
    style={{ border: '1px solid #d4d6d5', borderRadius: '10px' }}
    dataSource={dataSource}
    columns={columns}
    rowKey="key"
    size="small"
    pagination={true}
    // rowSelection
    scroll={{ x: 2800, y: 400 }}
    components={{
      header:{
        cell:(props)=>(
          <th style={HeaderStyle}>
            {props.children}
          </th>
        )
      }
    }}
  />
</Form>
      </div>
    </div>
  );
};

export default MyTable;