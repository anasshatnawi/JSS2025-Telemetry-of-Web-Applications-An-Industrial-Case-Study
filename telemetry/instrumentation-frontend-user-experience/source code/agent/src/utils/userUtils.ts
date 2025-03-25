// Importations
import { Context } from '@opentelemetry/api';
import { Span, SpanProcessor } from '@opentelemetry/sdk-trace-base';
import { v4 as uuidv4 } from 'uuid';

// Classes
/**
 * Custom Span Processor that attaches user identity information
 * (e.g., user ID, session ID, visit ID, etc.)
 * to every span and forwards the control to the next span processor
 */
export class UserIdentitySpanProcessor implements SpanProcessor {
    private static readonly USER_ID_KEY = 'app.user.id'; // key for user IDs
    private static readonly SESSION_ID_KEY = 'app.session.id'; // key for session IDs
    private static readonly VISIT_ID_KEY = 'app.visit.id'; // key for visit IDs
    private static readonly VISIT_TIMESTAMP_KEY = "app.visit.timestamp"; // key for visit timestamps
    private static readonly VISIT_TIMEOUT_MS = 30 * 60 * 1000; // visit timeout (30 minutes)

    private _nextProcessor: SpanProcessor;
    constructor(nextProcessor: SpanProcessor) {
        this._nextProcessor = nextProcessor;
    }

    /**
     * Attaches the user identity data to the span's attributes upon its start
     * Then forwards the control to the next span processor
     * @param span the target span where user identity data will be attached to
     * @param parentContext the parent context of the target span
     */
    onStart(span: Span, parentContext: Context): void {
        span.setAttribute(UserIdentitySpanProcessor.USER_ID_KEY, this.getOrGenerateUserId());
        span.setAttribute(UserIdentitySpanProcessor.SESSION_ID_KEY, this.getOrGenerateSessionId());
        span.setAttribute(UserIdentitySpanProcessor.VISIT_ID_KEY, this.getOrGenerateVisitId());
        this._nextProcessor.onStart(span, parentContext);
    }

    forceFlush(): Promise<void> {
        return this._nextProcessor.forceFlush();
    }

    onEnd(span: Span): void {
        this._nextProcessor.onEnd(span);
    }

    shutdown(): Promise<void> {
        return this._nextProcessor.shutdown();
    }

    /**
     * Retrieves or stores generated user IDs (using UUIDv4) into localStorage if available.
     * Otherwise, uses a fallback global store.
     * @returns the stored/generated user ID
     */
    private getOrGenerateUserId(): string {
        // Browser environment: use localStorage
        if (typeof window !== 'undefined' && localStorage) {
            let uid = localStorage.getItem(UserIdentitySpanProcessor.USER_ID_KEY);
            if (!uid) {
                uid = this.generateUserId();
                localStorage.setItem(UserIdentitySpanProcessor.USER_ID_KEY, uid);
            }
            return uid;
        } else {
            // Backend environment: use a property on the global object.
            const globalAny = globalThis as any;
            if (!globalAny.__appUserId) {
                globalAny.__appUserId = this.generateUserId();
            }
            return globalAny.__appUserId;
        }
    }

    /**
     * Generates user IDs using UUIDV4 
     * @returns the generated user ID
     */
    private generateUserId(): string {
        return `user-${uuidv4()}`;
    }

    /**
     * Retrieves or stores generated session IDs (using UUIDv4) into sessionStorage if available.
     * Otherwise, uses a fallback global store.
     * @returns the stored/generated session ID
     */
    private getOrGenerateSessionId(): string {
        // Browser environment: use sessionStorage
        if (typeof window !== 'undefined' && sessionStorage) {
            let sid = sessionStorage.getItem(UserIdentitySpanProcessor.SESSION_ID_KEY);
            if (!sid) {
                sid = this.generateSessionId();
                sessionStorage.setItem(UserIdentitySpanProcessor.SESSION_ID_KEY, sid);
            }
            return sid;
        } else {
            // Backend environment: use a property on the global object.
            const globalAny = globalThis as any;
            if (!globalAny.__appSessionId) {
                globalAny.__appSessionId = this.generateSessionId();
            }
            return globalAny.__appSessionId;
        }
    }

    /**
     * Generates session IDs using UUIDV4 
     * @returns the generated session ID
     */
    private generateSessionId(): string {
        return `session-${uuidv4()}`;
    }

    /**
     * Retrieves or stores generated visit IDs (using UUIDv4) into localStorage if available.
     * Otherwise, uses a fallback global store.
     * A new visit ID will always be generated after a visit timeout (by default, 30 minutes)
     * @returns the stored/generated visit ID
     */
    private getOrGenerateVisitId(): string {
        // Browser environment: use localStorage
        if (typeof window !== 'undefined' && localStorage) {
            let vid = localStorage.getItem(UserIdentitySpanProcessor.VISIT_ID_KEY);
            const now = Date.now();
            // If the visit didn't timeout yet, retrieve the stored visit ID
            if (vid) {
                const storedTimestamp = localStorage.getItem(UserIdentitySpanProcessor.VISIT_TIMESTAMP_KEY);
                if (storedTimestamp && now - parseInt(storedTimestamp, 10) < UserIdentitySpanProcessor.VISIT_TIMEOUT_MS) {
                    return vid;
                }
            }
            // Otherwise, generate a new visit ID.
            vid = this.generateVisitId();
            localStorage.setItem(UserIdentitySpanProcessor.VISIT_ID_KEY, vid);
            localStorage.setItem(UserIdentitySpanProcessor.VISIT_TIMESTAMP_KEY, now.toString());
            return vid;
        } else {
            // Backend environment: use a property on the global object.
            const globalAny = globalThis as any;
            if (!globalAny.__appVisitId || (Date.now() - globalAny.__appVisitTimestamp) > UserIdentitySpanProcessor.VISIT_TIMEOUT_MS) {
                globalAny.__appVisitId = this.generateVisitId();
                globalAny.__appVisitTimestamp = Date.now();
            }
            return globalAny.__appVisitId;
        }
    }

    /**
     * Generates visit IDs using UUIDV4 
     * @returns the generated visit ID
     */
    private generateVisitId(): string {
        return `visit-${uuidv4()}`;
    }
}