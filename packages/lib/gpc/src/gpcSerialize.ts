import {
  PODRawValue,
  PODRawValueTuple,
  PODValue,
  PODValueTuple,
  podValueOrTupleFromRawValue,
  podValueOrTupleToRawValue
} from "@pcd/pod";
import JSONBig from "json-bigint";
import {
  checkBoundConfig,
  checkProofConfig,
  checkRevealedClaims
} from "./gpcChecks";
import {
  GPCBoundConfig,
  GPCProofConfig,
  GPCRevealedClaims,
  PODMembershipLists
} from "./gpcTypes";

const jsonBigSerializer = JSONBig({
  useNativeBigInt: true,
  alwaysParseAsBig: true
});

/**
 * Wrapper to alter the error behavior of JSONBig.parse, which seems to throw
 * an object which has a name of "SyntaxError" but doesn't extend Error.
 */
//eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseWrapper(serialized: string, nameForErrors: string): any {
  // TODO(POD-P3): Consider generalizing this in @pcd/util.
  try {
    return jsonBigSerializer.parse(serialized);
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e;
    }
    throw new SyntaxError(`Invalid serialized ${nameForErrors}.`);
  }
}

/**
 * Serializes `GPCProofConfig` to a string in a full-fidelity format.  Calling
 * {@link deserializeGPCProofConfig} will reconstruct the same object.
 *
 * @param toSerialize the GPCProofConfig to serialize
 * @param space pretty-printing configuration, as defined by the corresponding
 *   argument to JSON.stringify.
 * @returns a string representation
 */
export function serializeGPCProofConfig(
  toSerialize: GPCProofConfig,
  space?: number
): string {
  return jsonBigSerializer.stringify(toSerialize, null, space);
}

/**
 * Deserializes `GPCProofConfig` from the full-fidelity format produced by
 * {@link serializeGPCProofConfig}, and checks the validity of the
 * configuration.
 *
 * @param serialized a string representation of `GPCProofConfig`
 * @returns `GPCProofConfig` deserialized from the string
 * @throws SyntaxError if the serialized form cannot be parsed
 * @throws TypeError if the serialized form doesn't match the expected type
 */
export function deserializeGPCProofConfig(serialized: string): GPCProofConfig {
  const deserialized = parseWrapper(serialized, "proof config");
  // TODO(POD-P2): Consider separating these steps to allow deserializing without checking.
  checkProofConfig(deserialized);
  return deserialized;
}

/**
 * Serializes `GPCBoundConfig` to a string in a full-fidelity format.  Calling
 * {@link deserializeGPCBoundConfig} will reconstruct the same object.
 *
 * @param toSerialize the GPCProofConfig to serialize
 * @param space pretty-printing configuration, as defined by the corresponding
 *   argument to JSON.stringify.
 * @returns a string representation
 */
export function serializeGPCBoundConfig(
  toSerialize: GPCBoundConfig,
  space?: number
): string {
  return jsonBigSerializer.stringify(toSerialize, null, space);
}

/**
 * Deserializes `GPCBoundConfig` from the full-fidelity format produced by
 * {@link serializeGPCBoundConfig}, and checks the validity of the
 * configuration.
 *
 * @param serialized a string representation of `GPCBoundConfig`
 * @returns `GPCBoundConfig` deserialized from the string
 * @throws SyntaxError if the serialized form cannot be parsed
 * @throws TypeError if the serialized form doesn't match the expected type
 */
export function deserializeGPCBoundConfig(serialized: string): GPCBoundConfig {
  const deserialized = parseWrapper(serialized, "bound proof config");
  // TODO(POD-P2): Consider separating these steps to allow deserializing without checking.
  checkBoundConfig(deserialized);
  return deserialized;
}

/**
 * Serializes `GPCRevealedClaims` to a string in a full-fidelity format.
 * Calling {@link deserializeGPCRevealedClaims} will reconstruct the same
 * object.
 *
 * @param toSerialize the GPCRevealedClaims to serialize
 * @param space pretty-printing configuration, as defined by the corresponding
 *   argument to JSON.stringify.
 * @returns a string representation
 */
export function serializeGPCRevealedClaims(
  toSerialize: GPCRevealedClaims,
  space?: number
): string {
  return jsonBigSerializer.stringify(toSerialize, null, space);
}

/**
 * Deserializes `GPCRevealedClaims` from the full-fidelity format produced by
 * {@link serializeGPCRevealedClaims}, and checks the validity of the
 * claims.
 *
 * @param serialized a string representation of `GPCRevealedClaims`
 * @returns `GPCRevealedClaims` deserialized from the string
 * @throws SyntaxError if the serialized form cannot be parsed
 * @throws TypeError if the serialized form doesn't match the expected type
 */
export function deserializeGPCRevealedClaims(
  serialized: string
): GPCRevealedClaims {
  const deserialized = parseWrapper(serialized, "revealed claims");
  // TODO(POD-P2): Consider separating these steps to allow deserializing without checking.
  checkRevealedClaims(deserialized);
  return deserialized;
}

/**
 * Serializes `PODMembershipLists` to a string in a simplified format optimized
 * for compactness and human readability. The simplified format discards type
 * information.  Calling {@link podMembershipListsFromSimplifiedJSON} will
 * construct `PODMembershipLists` containing the same values, which will behave
 * the same in hashing and circuits, but the type information may not be
 * identical.
 *
 * @param entries the entries to serialize
 * @param space pretty-printing configuration, as defined by the corresponding
 *   argument to JSON.stringify.
 * @returns a string representation
 */
export function podMembershipListsToSimplifiedJSON(
  membershipLists: PODMembershipLists,
  space?: number
): string {
  const simplified: Record<string, (PODRawValue | PODRawValueTuple)[]> = {};
  for (const [listName, membershipList] of Object.entries(membershipLists)) {
    simplified[listName] = membershipList.map(podValueOrTupleToRawValue);
  }
  return jsonBigSerializer.stringify(simplified, null, space);
}

/**
 * Deserializes `PODMembershipLists` from the simplified format produced by
 * {@link podMembershipListsToSimplifiedJSON}.  Type information is inferred
 * from the values in a way which should preserve hashing and circuit behavior,
 * but isn't guaranteed to be identical to the types before serialization.  For
 * instance, small numbers are always annotated as `int`, rather than
 * `cryptographic`.
 *
 * @param serializedMembershipLists a string representation of `PODMembershipLists`
 * @returns `PODMembershipLists` deserialized from the string
 * @throws if the serialized form is invalid
 */
export function podMembershipListsFromSimplifiedJSON(
  simplifiedJSON: string
): PODMembershipLists {
  const simplifiedEntries = jsonBigSerializer.parse(simplifiedJSON) as Record<
    string,
    PODRawValue[] | PODRawValueTuple[]
  >;
  const membershipLists: PODMembershipLists = {};
  for (const [listName, rawValueList] of Object.entries(simplifiedEntries)) {
    membershipLists[listName] = rawValueList.map(
      podValueOrTupleFromRawValue
    ) as PODValue[] | PODValueTuple[];
  }
  return membershipLists;
}
