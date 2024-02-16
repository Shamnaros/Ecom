import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArchiveIcon from '@mui/icons-material/AddBusiness';
import { DataGrid, GridToolbarContainer , GridActionsCellItem, GridRowModes, GridRowEditStopReasons } from '@mui/x-data-grid';
import Box from '@mui/material/Box';

const apiUrl = 'http://localhost:3001/api/products';

export default function FullFeaturedCrudGrid() {
  const [value, setValue] = React.useState(1);
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (params) => () => {
    const { id, row } = params;
  console.log('Edit Clicked - ID:', id);
  console.log('Saving data for id:', id);
  console.log('Row data before update:', row);
    updateData(id, row);
    // setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (params) => () => {
    const { id, row } = params;
    
  console.log('Saving data for id:', id);
  console.log('Row data before update:', row);
    updateData(id, row);
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCellEditCommit = React.useCallback(
    ({ id, field, props }) => {
      console.log('Cell Edit Commited - ID:', id, 'Field:', field, 'Value:', props.value);

      // Assuming 'name', 'price', 'stock', and 'category' are valid field values in your rows
      const updatedRow = { ...rows.find((row) => row.id === id), [field]: props.value };

      updateData(id, updatedRow);
      setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    },
    [setRows, setRowModesModel, rows]
  );
  

  const handleDeleteClick = async (id) => {
    try {
        console.log('Data Delete id send: ', id);
      const response = await fetch(`http://localhost:3001/api/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    fetchData();
      console.log('Data updated successfully:', response.json());
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    // Add your logic for canceling edit here if needed
  };

  const processRowUpdate = (newRow) => {
    // Add your logic for updating a record here if needed
    return newRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const updateData = async (id, updatedData) => {
    try {
        if(id === 0){
            createData(id, updatedData);
        }else{
        console.log('Data send: ', updatedData);
      const response = await fetch(`http://localhost:3001/api/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedRow = await response.json();
      
      // Assuming rows is your state variable containing the data
      setRows((oldRows) => {
        const updatedRows = oldRows.map((row) => (row.id === id ? { ...row, ...updatedRow } : row));
        return updatedRows;
      });
  
    fetchData();
      console.log('Data updated successfully:', updatedRow);
    }
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const createData = async (id, updatedData) => {
    try {
        console.log('Data send to create: ', updatedData);
      const response = await fetch(`http://localhost:3001/api/addproducts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const updatedRow = await response.json();
      
      // Assuming rows is your state variable containing the data
      setRows((oldRows) => {
        const updatedRows = oldRows.map((row) => (row.id === id ? { ...row, ...updatedRow } : row));
        return updatedRows;
      });
  
    fetchData();
      console.log('Data created successfully:', updatedRow);
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const rowsWithId = data.map((row) => ({ ...row, id: row._id }));
      setRows(rowsWithId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

useEffect(() => {
    fetchData();
  }, []);

  function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;
  
    const handleClick = () => {
      const id = 0 ;
      setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
      setRowModesModel((oldModel) => ({
        ...oldModel,
        [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
      }));
    };
  
    return (
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add record
        </Button>
      </GridToolbarContainer>
    );
  };

  const columns = [
    { field: 'name', headerName: 'Name', width: 280, editable: true, headerAlign: 'center', cellClassName: 'nameCell' },
    { field: 'price', headerName: 'Price', type: 'number', width: 200, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'stock', headerName: 'Stock', type: 'number', width: 200, editable: true, headerAlign: 'center', align: 'center' },
    { field: 'category', headerName: 'Categorys', width: 250, editable: true, headerAlign: 'center', align: 'center' },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 250,
      cellClassName: 'actions',
      getActions: (params) => {
        const isInEditMode = rowModesModel[params.id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(params)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(params.id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Edit"
            sx={{
                color: 'primary.main',
              }}
            // className="textPrimary"
            onClick={handleEditClick(params)}
            // color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => handleDeleteClick(params.id)}
            color="inherit"
          />,
        ];
      },
    },
  ];


  return (
    <Box
      sx={{
        height: 800,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
        '& .nameCell': {
          paddingLeft: 14, // Adjust the value as needed
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        onCellEditCommit={handleCellEditCommit}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                console.log("enter key pressed");
                event.preventDefault();
                // const { id, field } = params; 
                // if (id && field) {
                //     // Find the updated row with the new value
                //     const updatedRow = { ...rows.find((row) => row.id === id), [field]: event.target.value };
            
                //     // Call your updateData function
                //     updateData(id, updatedRow);
            
                //     // Set the row mode to View after saving
                //     setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
                //   }
            }
          }}
        slots={{
          toolbar: EditToolbar,
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction href='/' label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction href='/favorites' label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction href='/add' label="Add" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  );
}
