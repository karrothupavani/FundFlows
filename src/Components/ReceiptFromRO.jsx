import React, { useEffect, useState} from 'react';
import { Form, Table, Button, Input, Space, Select, DatePicker, InputNumber,Popconfirm } from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined ,CopyOutlined,HomeOutlined,SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
const { Option } = Select;
// const { Item: FormItem } = Form;
const MyTable = () => {
  const [form] = Form.useForm();
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [isRowEditing, setIsRowEditing] = useState(false);
  const token = localStorage.getItem('accessToken');
  const getData = ()=>{
    try {
      axios
        .get('https://api.p360.build:6060/v1/fundflow/receiptsFromRO/fetchAll', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
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
  }
  const updateRowInDatabase = async (updatedRowData,id) => {
    // const sessionId = '54A789521702EB47E76CBA33A76D3E7E'; // Replace with your session ID
  
    try {
      const response = await axios.put(
        `https://api.p360.build:6060/v1/fundflow/receiptsFromRO/submit`,
        {
           id: id,
          transactionType: updatedRowData.transactionType,
          documentDate: updatedRowData.documentDate,
          year: updatedRowData.year,
          period: updatedRowData.period,
          reference: updatedRowData.reference,
          receiptProject: updatedRowData.receiptProject,
          amount: updatedRowData.amount,
          status: updatedRowData.status,
          createdDate: updatedRowData.createdDate,
          createdBy: updatedRowData.createdBy,
          submittedOn: updatedRowData.submittedOn,
          submittedBy: updatedRowData.submittedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
            // Cookie: `JSESSIONID=${sessionId}`,
          },
        }
      );
      console.log('Row data updated:', response.data);
         getData();
    } catch (error) {
     
      console.error('Error updating row:', error);
    }
  };
  
  const saveNewRowToDatabase = async (newRowData) => {
   
    try {
      const response = await axios.post(
        'https://api.p360.build:6060/v1/fundflow/receiptsFromRO/draft',
        {
          transactionType: newRowData.transactionType,
          documentDate: newRowData.documentDate,
          year: newRowData.year,
          period: newRowData.period,
          reference: newRowData.reference,
         receiptProject: newRowData.receiptProject,
          amount: newRowData.amount,
          status: newRowData.status,
          createdDate: newRowData.createdDate,
          createdBy: newRowData.createdBy,
          submittedOn: newRowData.submittedOn,
          submittedBy: newRowData.submittedBy,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('New row data saved:', response.data);
      getData();
    } catch (error) {
     
      console.error('Error saving new row:', error);
    }
  };
  
  useEffect(() => {
  getData();
  },[]);

  const [dataSource, setDataSource] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [editedData, setEditedData] = useState({});
  const Navigate = useNavigate();
  const columns = [
    {
      title: 'Type',
      dataIndex: 'transactionType',
      width: '10%',
      key: 'transactionType',
      render: (text, record) => renderCell(record, 'transactionType', text),
      filters: [
        { text: 'BLR', value: 'BLR' },
        { text: 'CO', value: 'CO' },
        { text: 'HYD', value: 'HYD' },
        { text: 'RAN', value: 'RAN' },
      ],
      onFilter: (value, record) => record.transactionType === value,
    },
    {
      title: 'Line',
      dataIndex: 'id',
      key: 'id',
      width: '10%',
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
      title: 'Receipts Project',
      dataIndex: 'receiptProject',
      width: '10%',
      key: 'receiptProject',
      render: (text, record) => renderCell(record, 'receiptProject', text),
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
      filters: [
        { text: 'Draft', value: 'Draft' },
        { text: 'Submitted', value: 'submitted' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Entry Date',
      dataIndex: 'createdDate',
      width: '10%',
      key: 'createdDate',
      // render: (text, record) => renderDateCell(record, 'createdDate', text),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      width: '10%',
      key: 'createdBy',
      render: (text, record) => renderCell(record, 'createdBy', text),
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
        <div style={{ padding: 8 }}>
          <Input
            placeholder="Search Created By"
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => confirm()}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => confirm()}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    },
    {
      title: 'submitted On',
      dataIndex: 'submittedOn',
      width: '10%',
      key: 'submittedOn',
      // render: (text, record) => renderDateCell(record, 'submittedOn', text),
    },
    {
      title: 'submitted By',
      dataIndex: 'submittedBy',
      width: '10%',
      key: 'submittedBy',
      // render: (text, record) => renderCell(record, 'submittedBy', text),
    },
    {
      title: 'Action',
      dataIndex: 'Action',
      width: '7%',
      fixed: 'right',
      key: 'Action',
      render: (text, record) => {
        const isSubmitted = record.status === 'submitted';
        const isEditing = editRow === record;
        const isAnyRowEditing = dataSource.some((item) => editRow === item);
    
        return (
          <Space>
            {isEditing ? (
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
              <><abbr title='edit'>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => handleEditStart(record)}
                  disabled={isSubmitted ||isEditing||isAnyRowEditing}
                /></abbr>
              <abbr title='Duplicate'>  <Button
                  type="link"
                  icon={<CopyOutlined />}
                  onClick={() => handleDuplicate(record)}
                  disabled={isEditing || isAnyRowEditing } 
                /></abbr>
              </>
            )}
          </Space>
        );
      },
    },
    
];

  const handleDuplicate = (record) => {
    
    const duplicateItem = { ...record };
    duplicateItem.key = `newRow-${Date.now()}`;
    duplicateItem.status = 'Draft';
    duplicateItem.createdBy = localStorage.getItem("email");
    const { year, period } = calculateYearAndPeriod(duplicateItem.documentDate);
    duplicateItem.year = year;
    duplicateItem.period = period;
    if (duplicateItem.status === 'Draft') {
      duplicateItem.submittedOn = '';
      duplicateItem.submittedBy = '';
    }
    setDataSource([duplicateItem, ...dataSource]);
    setEditRow(duplicateItem);
    setIsAddButtonDisabled(true);
  };
  

  const renderCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;
  
    if (isEditing) {
      if (dataIndex === 'transactionType') {
        return (
          <Select
            style={{ width: '100%' }}
            value={editedData[record.key]?.transactionType === undefined ? text : editedData[record.key]?.[dataIndex]}
            onChange={(value) => handleEditInputChange(value, record, 'transactionType')}
          >
            <Option value="BLR">BLR</Option>
            <Option value="CO">CO</Option>
            <Option value="HYD">HYD</Option>
            <Option value="RAN">RAN</Option>
            
          </Select>
        );
      } else {
        return (
          <Input
            value={editedData[record.key]?.[dataIndex] === undefined ? text : editedData[record.key]?.[dataIndex]}
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
    const isSubmitted = record && record.status === 'submitted'; 
  
    let cellStyle = {};
  
    if (isEditing) {
      return (
        <Select
          style={{ width: '100%' }}
          value={editedData[record.key]?.status || text}
          onChange={(value) => handleEditInputChange(value, record, 'status')}
        >
          <Option value="Draft">Draft</Option>
          <Option value="submitted">submitted</Option>
        </Select>
      );
    }
    if (isSubmitted) {
      
      return (
        <span style={{ ...cellStyle, padding: '4px', borderRadius: '4px',color: 'white', backgroundColor: '#5db8fc'  }}>{text}</span>
      );
    } else {
      
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
  const calculateYearAndPeriod = (documentDate) => {
    const date = moment(documentDate, 'DD-MM-YYYY');
    const year = date.month() >= 3 ? date.year() : date.year() - 1;
    const period = date.month() >= 3 ? date.month() - 2 : date.month() + 10; 
    return { year, period };
  };
  
  // const [yearAndPeriod, setYearAndPeriod] = useState({ year: '', period: '' });
  
  const renderDateCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;
  
    const handleDateChange = (date, dateString) => {
      handleEditInputChange(dateString, record, dataIndex);
      const { year, period } = calculateYearAndPeriod(dateString);
      // setYearAndPeriod({ year, period });
      return{year,period};
    };
  
    if (isEditing) {
      return (
        <DatePicker
          style={{ width: '100%' }}
          format="DD-MM-YYYY"
          value={editedData[record.key]?.[dataIndex] ? moment(editedData[record.key][dataIndex], 'DD-MM-YYYY') : null}
          onChange={handleDateChange}
        />
      );
    }
  
    return text;
  };
  
  
  const handleEditInputChange = (value, record, field) => {
    if (field === 'documentDate') {
      // Calculate year and period based on the new document date
      const { year, period } = calculateYearAndPeriod(value);
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [record.key]: {
          ...(prevEditedData[record.key] || {}),
          documentDate: value, 
          year, 
          period, 
        },
      }));
    } else {
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [record.key]: {
          ...(prevEditedData[record.key] || {}),
          [field]: value,
        },
      }));
    }
  };
  
  
  const renderNumberCell = (record, dataIndex, text) => {
    const isEditing = editRow === record;

    if (isEditing) {
      return (
        <InputNumber
          style={{ width: '100%' }}
          value={editedData[record.key]?.[dataIndex]=== undefined ? text : editedData[record.key]?.[dataIndex]}
          onChange={(value) => handleEditInputChange(value, record, dataIndex)}
        />
      );
    }

    return text;
  };


    const handleHomeButton = ()=>{
        Navigate('/Home');
    }

    
    const handleEditStart = (record) => {
      setIsRowEditing(true);
      setEditRow(record);
      setEditedData((prevEditedData) => ({
        ...prevEditedData,
        [record.key]: { ...record },
      }));
    };
  
  
 
    const handleEditCancel = (record) => {
      if (record && record.key) {
        if (record.key.startsWith('newRow')) {
          setDataSource((prevDataSource) =>
            prevDataSource.filter((item) => item.key !== record.key)
          );
        }
        setEditedData((prevEditedData) => {
          delete prevEditedData[record.key];
          return prevEditedData;
        });
      }
      setEditRow(null);
      setIsAddButtonDisabled(false);
      setIsRowEditing(false);
    };
    
  
  
  
  const handleSaveEdit = async (record) => {
    if (editedData[record.key]) {
      const editedRowData = {
        ...dataSource.find((item) => item.key === record.key),
        ...editedData[record.key],
      };
  
      if (editedRowData.status === "submitted") {
        const submittedBy = localStorage.getItem("email");
        const submittedOn = moment().format("DD-MM-YYYY HH:mm:ss");
        editedRowData.submittedBy = submittedBy;
        editedRowData.submittedOn = submittedOn;
      }
      if (record.key && record.key.startsWith("newRow")) {
        saveNewRowToDatabase(editedRowData);
      } else {
        updateRowInDatabase(editedRowData, record.id);
      }
    }
  
    setEditRow(null);
    setEditedData((prevEditedData) => {
      delete prevEditedData[record.key];
      return prevEditedData;
    });
  
    setIsAddButtonDisabled(false);
    setIsRowEditing(false);
  };
  
  
  const handleAddItem = () => {
    const date = moment().format("DD-MM-YYYY HH:mm:ss"); 
    const userName = localStorage.getItem('email');
    const newItem = {

      key: `newRow-${Date.now()}`,
      transactionType: '',
      DocumentNumber: '',
      documentDate:  '',
      year: "",
      period: '',
      reference: '',
      receiptProject: '',
      amount: "",
      status: 'Draft',
      createdDate:date,
      createdBy: userName,
      submittedOn: "",
      submittedBy: '',
    };
  
    setDataSource([newItem, ...dataSource]);
    setEditRow(newItem);
    setIsAddButtonDisabled(true); 
    setEditedData((prevEditedData) => ({
      ...prevEditedData,
      [newItem.key]: { ...newItem },
    }));
  };

  
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ padding: '25px', width: '100%' }}>
        
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Typography variant="h4">Receipt From RO</Typography>
         <div>
          <Button
        type="primary"
        onClick={handleAddItem}
        style={{ marginBottom: 16 ,marginRight:20}}
        disabled={isAddButtonDisabled||isRowEditing || (editRow && editRow.status === 'AddOn')}
      >
        Add
      </Button>
      <Button type='primary' onClick={handleHomeButton} icon={<HomeOutlined/>}></Button>
      </div>
        </div>
        <Form form={form} >
      <Table
        style={{ border: '1px solid #d4d6d5', borderRadius: '10px' }}
        dataSource={dataSource}
        columns={columns}
        rowKey={(record, index) => index.toString()} 
        size="small"
        pagination={true}
        scroll={{ x: 2500, y: 380 }}
      />
    </Form>
      </div>
    </div>
  );
};

export default MyTable;