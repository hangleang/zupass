import { ReactNode, useEffect, useMemo, useState } from "react";
// eslint-disable-next-line import/no-named-as-default
import Spreadsheet from "react-spreadsheet";
import styled from "styled-components";
import { parseCSV } from "./parseCSV";

export function CSVSheetPreview({ csv }: { csv: string }): ReactNode {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [parsed, setParsed] = useState<string[][]>([]);
  const [parseError, setParseError] = useState<Error>();

  useEffect(() => {
    parseCSV(csv)
      .then((parsed) => {
        setParsed(parsed);
        setParseError(undefined);
      })
      .catch((e) => {
        setParsed([]);
        setParseError(e);
      });
  }, [csv]);

  const data: Array<Array<{ value: string }>> = useMemo(() => {
    const copy = [...parsed];
    copy.shift();
    return copy.map((row) => row.map((value) => ({ value })));
  }, [parsed]);

  if (parseError) {
    return <Container>{parseError.message}</Container>;
  }

  return (
    <Container>
      <Spreadsheet
        onChange={(_data: unknown): void => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          setParsed([...parsed]);
        }}
        darkMode={true}
        data={data}
        columnLabels={parsed[0]}
        className={"sheet"}
      />
    </Container>
  );
}

const clr = `rgba(47,55,70,1)`;

const Container = styled.div`
  padding: 16px;
  border-radius: 4px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-y: scroll;
  overflow-x: scroll;
  height: 100%;
  width: 100%;

  .sheet {
    background-color: ${clr};

    table {
      td {
        padding: 8px;
      }
    }
  }
`;
