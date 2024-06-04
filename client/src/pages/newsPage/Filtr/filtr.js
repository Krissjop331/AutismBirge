import React, { useState } from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import './News_filre.css'

export const Filtr = ({ newsTags, onFilter }) => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleTagChange = (selectedOptions) => {
    const selectedTagIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setSelectedTags(selectedTagIds);
    onFilter(selectedTagIds, selectedDate);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onFilter(selectedTags, date);
  };

  const options = newsTags
    .filter(tag => tag.Tag) // Filter out tags where Tag is null
    .map(tag => ({
      value: tag.tag_id,
      label: tag.Tag.title,
    }));

  return (
    <div className="news_filters">
      <div className="news_filter">
        
        <h3>Фильтр</h3>
        
        <form className="news_custom-form">
          <div className="news_form-group">
            <label htmlFor="custom-select-tags">Тип</label>
            <Select
              id="custom-select-tags"
              options={options}
              isMulti
              className="custom-select"
              classNamePrefix="custom-select"
              value={options.filter(option => selectedTags.includes(option.value))}
              onChange={handleTagChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="custom-date">Дата</label>
            <DatePicker
              id="custom-date"
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              className="custom-date"
            />
          </div>
        </form>
      </div>
    </div>
  );
};



// import React, { useState } from 'react';
// import Select from 'react-select';
// import DatePicker from 'react-datepicker';
// import './News_filre.css'

// export const Filtr = ({ newsTags, onFilter }) => {
//   const [selectedTags, setSelectedTags] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(null);

//   const handleTagChange = (selectedOptions) => {
//     const selectedTagIds = selectedOptions ? selectedOptions.map(option => option.value) : [];
//     setSelectedTags(selectedTagIds);
//     onFilter(selectedTagIds, selectedDate);
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//     onFilter(selectedTags, date);
//   };

//   const options = newsTags
//     .filter(tag => tag.Tag) // Filter out tags where Tag is null
//     .map(tag => ({
//       value: tag.tag_id,
//       label: tag.Tag.title,
//     }));

//   return (
//     <div className="filters">
//       <div className="filter">
//         <h3>Фильтр</h3>
//         <hr />
//         <form className="custom-form">
//           <div className="form-group">
//             <label htmlFor="custom-select-tags">Тип</label>
//             <Select
//               id="custom-select-tags"
//               options={options}
//               isMulti
//               className="custom-select"
//               classNamePrefix="custom-select"
//               value={options.filter(option => selectedTags.includes(option.value))}
//               onChange={handleTagChange}
//             />
//           </div>
//           <div className="form-group">
//             <label htmlFor="custom-date">Дата</label>
//             <DatePicker
//               id="custom-date"
//               selected={selectedDate}
//               onChange={handleDateChange}
//               dateFormat="yyyy-MM-dd"
//               className="custom-date"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };
