import React, { Fragment } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { filterOptions } from "./filterOptions.js";

const Filter = ({ filters, handleFilter }) => {
  return (
    <div className="flex justify-center">
      <div className="w-full sm:w-72 relative">
        <div className="sticky top-24 z-50">
          <h3 className="text-xl font-semibold mb-5 text-gray-600 flex items-center justify-between px-4">
            Filters <FilterListIcon />
          </h3>
          <div className="p-4 space-y-4">
            <Fragment>
              {filterOptions &&
                Object.keys(filterOptions).map((keyItem) => (
                  <Accordion
                    key={keyItem}
                    defaultExpanded={keyItem === "category"}
                  >
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                      {keyItem}
                    </AccordionSummary>
                    <AccordionDetails>
                      <FormGroup>
                        {filterOptions[keyItem] &&
                          filterOptions[keyItem].map((item, i) => (
                            <FormControlLabel
                              key={i}
                              control={
                                <Checkbox
                                  // Ensure that 'checked' is always either true or false
                                  checked={
                                    filters &&
                                    filters[keyItem] &&
                                    filters[keyItem].indexOf(item.id) > -1
                                      ? true
                                      : false
                                  }
                                  onChange={() =>
                                    handleFilter(keyItem, item.id)
                                  }
                                />
                              }
                              label={item.label}
                            />
                          ))}
                      </FormGroup>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Fragment>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
