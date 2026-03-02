import { DEFAULT_VIEW_MATRIX, DEFAULT_CAMERAS, type Mat4 } from './src/viewer/camera.js';

function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

function normalize(a) {
    const l = Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
    return [a[0]/l, a[1]/l, a[2]/l];
}

function levelMatrix(m) {
    // Row 2 is the Forward vector (indices 2, 6, 10)
    const f = [m[2], m[6], m[10]];
    const worldUp = [0, 1, 0];
    
    // Right = worldUp x Forward
    let r = normalize(cross(worldUp, f));
    // Up = Forward x Right
    let u = normalize(cross(f, r));
    
    const out = [...m];
    // Set Row 0 (Right)
    out[0] = r[0]; out[4] = r[1]; out[8] = r[2];
    // Set Row 1 (Up)
    out[1] = u[0]; out[5] = u[1]; out[9] = u[2];
    // Row 2 (Forward) stays as is or can be re-normalized if needed
    
    return out;
}

function levelPose(p) {
    const rMat = p.rotation;
    // Rotation matrix in CameraPose: r[0] is X, r[1] is Y, r[2] is Z (Forward)
    // Actually standard rotation matrix: columns are world-basis in camera? 
    // No, usually in these poses: r[0..2] is row-major rotation matrix.
    // Let's assume r[0] is Right, r[1] is Up, r[2] is Forward.
    
    const f = rMat[2];
    const worldUp = [0, 1, 0];
    const r = normalize(cross(worldUp, f));
    const u = normalize(cross(f, r));
    
    return {
        ...p,
        rotation: [r, u, f]
    };
}

console.log('Leveled DEFAULT_VIEW_MATRIX:');
console.log(JSON.stringify(levelMatrix(DEFAULT_VIEW_MATRIX).map(v => Math.round(v * 100) / 100)));

console.log('
Leveled First Camera Rotation:');
const leveledCam = levelPose(DEFAULT_CAMERAS[0]);
console.log(JSON.stringify(leveledCam.rotation));
