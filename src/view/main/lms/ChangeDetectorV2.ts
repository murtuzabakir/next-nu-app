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

   const addedRecords: T[] = [];
   const updatedRecords: T[] = [];

   currentRecords.forEach((current) => {
      const backup = backupMap.get(current[primaryField]);
      if (!backup) {
         addedRecords.push(current); // No match, it's a new record
      } else if (!compareRecords(current, backup, identityFields)) {
         updatedRecords.push(current); // Found a match, but it has been updated
      }
      backupMap.delete(current[primaryField]); // Remove processed record from backupMap
   });

   // Remaining records in backupMap are deleted
   const deletedRecords = Array.from(backupMap.values());

   return {
      added: addedRecords,
      deleted: deletedRecords,
      updated: updatedRecords,
   };
};
