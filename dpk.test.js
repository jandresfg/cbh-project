const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Returns event.partitionKey when given an event with a string partitionKey in it", () => {
    const key = deterministicPartitionKey({ partitionKey: "12345" });
    expect(key).toBe("12345");
  });

  it("Returns event.partitionKey as string when given an event with a number partitionKey in it", () => {
    const key = deterministicPartitionKey({ partitionKey: 12345 });
    expect(key).toBe("12345");
  });

  it("Returns event.partitionKey stringified when given an event with an object partitionKey in it", () => {
    const key = deterministicPartitionKey({
      partitionKey: { test: "test" },
    });
    expect(key).toBe(JSON.stringify({ test: "test" }));
  });

  it("Returns hashed stringified event when given an event without partitionKey in it", () => {
    const key = deterministicPartitionKey({ test: "test" });
    expect(key).toBe(
      "e713e2c89bc829e783a43a53583c0f8db2e9ad5f392f88d3a3be9776a5d6307ddaa4fb1d427c2390be1834bcf73646ddbbab8979eaf923e01376b3031ef9189d"
    );
  });

  it("Returns hashed stringified event when given a long event without partitionKey in it", () => {
    const key = deterministicPartitionKey({
      test: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut magna vel lectus aliquam bibendum sed sed purus. Vivamus porta, nunc nec tincidunt tincidunt, mi velit hendrerit enim, ut congue justo eros vel lectus. Donec tempor maximus molestie. Nam a scelerisque est, in pretium diam. Pellentesque luctus tellus augue, a venenatis tellus molestie vel. Donec augue magna, finibus sit amet sem at, accumsan malesuada mauris. Maecenas tellus mi, finibus et lorem ut, interdum imperdiet tellus. Vivamus porta odio ut libero fermentum mollis. Donec non sapien nibh. Curabitur at iaculis urna. Quisque quis consectetur libero. Proin id enim quis justo rhoncus rutrum.",
    });
    expect(key).toBe(
      "eb8762b4392d79db8b28e92fe86434d912455a3f48f971b767501c4c51bae212dd4f77c3e37260a6ea3694205aa0819a799bd161036d0f31eb5fd083404dcaba"
    );
  });

  it("Returns hashed stringified event.partitionKey when given an event with a long partitionKey in it", () => {
    const key = deterministicPartitionKey({
      partitionKey:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut magna vel lectus aliquam bibendum sed sed purus. Vivamus porta, nunc nec tincidunt tincidunt, mi velit hendrerit enim, ut congue justo eros vel lectus. Donec tempor maximus molestie. Nam a scelerisque est, in pretium diam. Pellentesque luctus tellus augue, a venenatis tellus molestie vel. Donec augue magna, finibus sit amet sem at, accumsan malesuada mauris. Maecenas tellus mi, finibus et lorem ut, interdum imperdiet tellus. Vivamus porta odio ut libero fermentum mollis. Donec non sapien nibh. Curabitur at iaculis urna. Quisque quis consectetur libero. Proin id enim quis justo rhoncus rutrum.",
    });
    expect(key).toBe(
      "53cbd12f5facc7c112e04aa145e5cc559b3523c7b1554964748b25ddbcb24db9e9e50f719953c8c19ee5c92544a15b9f292056e9d4cf6dc5a91f2739159978de"
    );
  });
});
