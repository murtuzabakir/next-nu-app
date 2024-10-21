type DataRecord = Record<string, any>;

interface ChangeResult<T> {
   added: T[];
   deleted: T[];
   updated: T[];
}

interface DetectorOptions {
   identityFields: string[];
}

const compareRecords = (record1: DataRecord, record2: DataRecord, identityFields: string[]): boolean => {
   return Object.keys(record1).every((key) => {
      if (identityFields.includes(key)) return true;
      return record1[key] === record2[key];
   });
};

export const detectDataChanges = <T extends DataRecord>(currentRecords: T[], backupRecords: T[], options: DetectorOptions): ChangeResult<T> => {
   const { identityFields } = options;
   const primaryField = identityFields[0];

   const backupMap = new Map(backupRecords.map((record) => [record[primaryField], record]));

   const addedRecords = currentRecords.filter((current) => !backupMap.has(current[primaryField]));

   const deletedRecords = backupRecords.filter((backup) => !currentRecords.some((current) => current[primaryField] === backup[primaryField]));

   const updatedRecords = currentRecords.filter((current) => {
      const backup = backupMap.get(current[primaryField]);
      return backup && !compareRecords(current, backup, identityFields);
   });

   return {
      added: addedRecords,
      deleted: deletedRecords,
      updated: updatedRecords,
   };
};

// Example usage remains unchanged
