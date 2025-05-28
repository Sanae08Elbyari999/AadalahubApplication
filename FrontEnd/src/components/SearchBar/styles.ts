import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
  },
  topRow: {
    marginBottom: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
  },
  activeFilter: {
    backgroundColor: '#BBCF25',
  },
  filterText: {
    color: '#666',
    fontSize: 14,
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    flex: 2,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 5,
  },
  citySelector: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginRight: 5,
  },
  cityText: {
    color: '#333',
  },
  arrow: {
    color: '#666',
    fontSize: 10,
  },
  searchButton: {
    width: 100,
    height: 40,
    borderRadius: 5,
    backgroundColor: '#2E4E3F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    maxHeight: '60%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cityItemText: {
    fontSize: 16,
  },
  selectedItem: {
    backgroundColor: '#f0f7e8',
  },

 serviceButton: {
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10, 
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginTop: 13,
    width: '75%',
    alignSelf: 'flex-end',
    marginRight: 8,
},
serviceButtonText: {
    fontSize: 12,
    color: '#333',
    fontWeight: 'black', 
    flex: 1, 
    textAlign: 'left', 
},
arrowContainer: {
    marginLeft: 5, 
},
headerTextContainer: {
    flexDirection: 'row',
    marginBottom: 8,
    marginLeft: 8,
    marginTop: 5,
},
headerTextPart1: {
    fontSize: 16,
    fontWeight: 'black',
    color: '#336950', 
},
headerTextPart2: {
    fontSize: 16,
    fontWeight: 'black',
    color: '#BBCF25', 
},
});

export default styles;