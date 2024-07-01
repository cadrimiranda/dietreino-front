import { Button, Input, InputRef, Popover, Space } from "antd/lib";
import { ColumnType } from "antd/lib/table";
import { useRef, useState } from "react";
import { Icon } from "../components/Icon";
import { FilterDropdownProps } from "antd/lib/table/interface";

export const COLUMN_SEARCH_DEBOUNCE = 1000;

const useTableColumnSearcn = <T,>(
  onSearch: (props: { searchText: string; searchedColumn: string }) => void,
  disabled?: boolean,
  isLoading?: boolean
) => {
  const [value, setValue] = useState<string>("");
  const searchInput = useRef<InputRef>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const onFilter = (column: string, noDebouce = false) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    const props = {
      searchText: searchInput.current?.input?.value || "",
      searchedColumn: column,
    };
    if (noDebouce) {
      onSearch(props);
    } else {
      debounceRef.current = setTimeout(
        () => onSearch(props),
        COLUMN_SEARCH_DEBOUNCE
      );
    }
  };

  const handleSearch = (
    column: string,
    confirm: FilterDropdownProps["confirm"],
    isEnter: boolean
  ) => {
    confirm({ closeDropdown: false });
    onFilter(column, isEnter);
  };

  const handleReset = (
    clearFilters: FilterDropdownProps["clearFilters"],
    column: string
  ) => {
    clearFilters?.();
    setValue("");
    onSearch({ searchText: "", searchedColumn: column });
  };

  const tableOptions = (
    dataIndex: string
  ): Pick<
    ColumnType<T>,
    "filterDropdown" | "filterIcon" | "onFilterDropdownOpenChange"
  > =>
    disabled
      ? {}
      : {
          filterDropdown: ({ confirm, clearFilters, close }) => (
            <div className="p-4" onKeyDown={(e) => e.stopPropagation()}>
              <Input
                ref={searchInput}
                placeholder={`Pesquise ${dataIndex}`}
                value={value}
                onChange={(e) => {
                  handleSearch(dataIndex, confirm, false);
                  setValue(e.target.value);
                }}
                onPressEnter={() => handleSearch(dataIndex, confirm, true)}
                style={{
                  marginBottom: 8,
                  display: "block",
                }}
                disabled={isLoading}
              />
              <Space>
                <Button
                  onClick={() => handleReset(clearFilters, dataIndex)}
                  size="small"
                  style={{
                    width: 90,
                  }}
                  loading={isLoading}
                >
                  Resetar
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => {
                    close();
                  }}
                  loading={isLoading}
                >
                  Fechar
                </Button>
              </Space>
            </div>
          ),
          filterIcon: (
            <Popover
              title={
                value
                  ? `Filtrado por ${value}`
                  : "Filtre resultados a partir do nome"
              }
            >
              <Icon
                data-testid="icon-search-table-column"
                iconName="glass"
                color={value ? "gold-4" : "colorWhite"}
              />
            </Popover>
          ),
          onFilterDropdownOpenChange: (visible) => {
            if (visible) {
              setTimeout(() => searchInput.current?.select(), 100);
            }
          },
        };

  return tableOptions;
};

export { useTableColumnSearcn };
