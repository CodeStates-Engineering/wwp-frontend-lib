type OriginalObject<Key extends string, Value> = {
  [K in Key]: Value;
};

type OriginalData<Key extends string, Value> =
  | {
      key: Key;
      value: Value;
    }[]
  | OriginalObject<Key, Value>;

class ConvenienceObject<Key extends string, Value> {
  constructor(originalData: OriginalData<Key, Value>) {
    let object = {} as OriginalObject<Key, Value>;
    if (Array.isArray(originalData)) {
      for (const item of originalData) {
        object[item.key] = item.value;
      }
    } else {
      object = originalData;
    }
    Object.assign(this, object);
  }

  keys() {
    return Object.keys(this) as Key[];
  }

  values() {
    return Object.values(this) as Value[];
  }

  toArray() {
    const keys = this.keys();
    const values = this.values();
    return keys.map((key, index) => ({ key, value: values[index] }));
  }

  toMap() {
    const keys = this.keys();
    const values = this.values();
    return new Map(keys.map((key, index) => [key, values[index]]));
  }

  valueOf(key: string): Value | undefined {
    const object: object = this;
    for (const k in object) {
      if (k === key) {
        return object[k as keyof object];
      }
    }
    return undefined as any;
  }

  keyOf(value: Value): Key | undefined {
    const object: object = this;
    for (const k in object) {
      const _value = object[k as keyof object];
      if (_value === value) {
        return k as any;
      }
    }
    return undefined as any;
  }
}

export function createConvenienceObject<Key extends string, Value>(
  object: OriginalData<Key, Value>
) {
  return new ConvenienceObject(object) as ConvenienceObject<Key, Value> &
    OriginalObject<Key, Value>;
}
