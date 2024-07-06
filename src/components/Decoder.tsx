import MatrixInput from "./MatrixInput";
const Decoder = ({
  decodeResults,
  modulo,
  setModulo,
  showModulo = true,
  pcm,
  setPcm,
  showPCM = true,
  word,
  setWord,
  showWord = true,
}: {
  decodeResults: {
    decodedWord: string;
    loading: boolean;
    error: boolean;
  };
  modulo: number;
  setModulo: React.Dispatch<React.SetStateAction<number>>;
  showModulo?: boolean;
  pcm: number[][];
  setPcm: React.Dispatch<React.SetStateAction<number[][]>>;
  showPCM?: boolean;
  word: number[][];
  setWord: React.Dispatch<React.SetStateAction<number[][]>>;
  showWord?: boolean;
}) => {
  return (
    <div className="flex flex-col gap-10 min-w-full max-w-screen-sm md:max-w-screen-md bg-gray-900 rounded-xl py-4 text-white">
      <div className="flex justify-between">
        <div className="flex flex-col px-10">
          <h3 className="text-gray-300 text-xl">Decoded Word</h3>
          <p className="text-white text-3xl font-bold w-full max-w-[10rem] md:max-w-[20rem] lg:max-w-[50rem] overflow-x-auto py-1 ">
            {decodeResults.error
              ? "Rejected"
              : decodeResults.loading
              ? "Calculating..."
              : decodeResults.decodedWord}
          </p>
        </div>

        {showModulo && (
          <div className="flex justify-between">
            <div className="flex flex-col px-10">
              <h3 className="text-gray-300 text-xl">Modulo</h3>
              <input
                type="number"
                value={modulo.toString()}
                className="focus:outline-none text-white bg-gray-900 w-12 h-12 flex justify-center items-center text-center text-3xl"
                onChange={(e) => {
                  setModulo(Number(e.target.value));
                }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="px-10 flex flex-col gap-10">
        {showPCM && (
          <DecoderItem
            title="PCM H"
            matrixInput={<MatrixInput data={pcm} setData={setPcm} marshalPasteOfBinaryString={modulo == 2} />}
          />
        )}
        {showWord && (
          <DecoderItem
            title="Received Word r"
            matrixInput={
              <MatrixInput
                data={word}
                setData={setWord}
                showRow={false}
                showCol={false}
                marshalPasteOfBinaryString={modulo == 2}
              />
            }
          />
        )}
      </div>
    </div>
  );
};

const DecoderItem = ({
  title,
  matrixInput,
}: {
  title: string;
  matrixInput: JSX.Element;
}) => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="text-gray-300 text-xl">{title}</h3>
      {matrixInput}
    </div>
  );
};

export default Decoder;
